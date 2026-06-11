/**
 * XRP Blocks — WebSerial Connection Manager
 * Handles the full lifecycle: connect → upload Python → run → stop → read output
 */

export class XRPSerial {
  constructor() {
    this.port = null;
    this.reader = null;
    this.writer = null;
    this.readableStreamClosed = null;
    this.writableStreamClosed = null;
    this.connected = false;
    this.decoder = new TextDecoder();
    this.encoder = new TextEncoder();

    // Event callbacks
    this.onConnect = null;
    this.onDisconnect = null;
    this.onData = null;
    this.onError = null;

    // Internal buffer for reading
    this._readBuffer = '';
  }

  /**
   * Check if WebSerial is supported
   */
  static isSupported() {
    return 'serial' in navigator;
  }

  /**
   * Connect to the XRP robot via WebSerial
   */
  async connect() {
    if (!XRPSerial.isSupported()) {
      throw new Error('WebSerial is not supported in this browser. Please use Chrome or Edge.');
    }

    try {
      // Request a serial port — user will see a browser picker dialog
      this.port = await navigator.serial.requestPort();

      // Open with standard MicroPython REPL settings
      await this.port.open({
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        flowControl: 'none',
      });

      this.connected = true;

      // Set up writer
      this.writer = this.port.writable.getWriter();

      // Start reading in background
      this._startReading();

      if (this.onConnect) this.onConnect();
    } catch (err) {
      if (err.name === 'NotFoundError') {
        // User cancelled the dialog — not an error
        return;
      }
      this.connected = false;
      if (this.onError) this.onError(err);
      throw err;
    }
  }

  /**
   * Disconnect from the XRP robot
   */
  async disconnect() {
    try {
      this.connected = false;

      if (this.reader) {
        await this.reader.cancel();
        this.reader = null;
      }

      if (this.writer) {
        await this.writer.close();
        this.writer = null;
      }

      if (this.port) {
        await this.port.close();
        this.port = null;
      }
    } catch (err) {
      // Ignore close errors
    }

    if (this.onDisconnect) this.onDisconnect();
  }

  /**
   * Send raw data to the XRP
   */
  async send(data) {
    if (!this.connected || !this.writer) {
      throw new Error('Not connected to XRP');
    }
    await this.writer.write(this.encoder.encode(data));
  }

  /**
   * Interrupt any running program (send Ctrl+C twice)
   */
  async interrupt() {
    await this.send('\r\x03\x03');
    // Small delay to let REPL recover
    await this._delay(100);
  }

  /**
   * Enter raw REPL mode for clean code execution
   */
  async enterRawRepl() {
    // Interrupt anything running
    await this.interrupt();
    await this._delay(100);

    // Enter raw REPL mode (Ctrl+A)
    await this.send('\r\x01');
    await this._delay(100);
  }

  /**
   * Exit raw REPL mode back to normal (Ctrl+B)
   */
  async exitRawRepl() {
    await this.send('\x02');
    await this._delay(100);
  }

  /**
   * Execute Python code on the XRP via raw REPL
   */
  async executeCode(pythonCode) {
    if (!this.connected) {
      throw new Error('Not connected to XRP');
    }

    try {
      // Enter raw REPL
      await this.enterRawRepl();

      // Send the code
      // In raw REPL, we send the code followed by Ctrl+D to execute
      await this.send(pythonCode);
      await this._delay(50);

      // Execute (Ctrl+D)
      await this.send('\x04');
    } catch (err) {
      if (this.onError) this.onError(err);
      throw err;
    }
  }

  /**
   * Stop a running program on the XRP
   */
  async stopExecution() {
    if (!this.connected) return;
    await this.interrupt();
    await this.exitRawRepl();
  }

  /**
   * Upload a Python file to the XRP filesystem
   */
  async uploadFile(filename, content) {
    // Use raw REPL to write the file
    const escapedContent = content.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
    const writeCode = `f = open('${filename}', 'w')\nf.write('${escapedContent}')\nf.close()\nprint('File saved: ${filename}')\n`;

    await this.executeCode(writeCode);
  }

  /**
   * Run code from blocks: upload as main.py then execute
   */
  async runProgram(pythonCode) {
    if (!this.connected) {
      throw new Error('Not connected to XRP');
    }

    // Execute code directly via raw REPL
    await this.executeCode(pythonCode);
  }

  /**
   * Start reading serial data in the background
   */
  async _startReading() {
    while (this.port && this.port.readable && this.connected) {
      this.reader = this.port.readable.getReader();
      try {
        while (true) {
          const { value, done } = await this.reader.read();
          if (done) break;
          if (value) {
            const text = this.decoder.decode(value);
            if (this.onData) this.onData(text);
          }
        }
      } catch (err) {
        if (this.connected) {
          if (this.onError) this.onError(err);
        }
      } finally {
        if (this.reader) {
          try {
            this.reader.releaseLock();
          } catch (e) {
            // Ignore
          }
        }
      }
    }
  }

  /**
   * Utility delay
   */
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
