/**
 * XRP Blocks — WebSerial Connection Manager
 * Handles the full lifecycle: connect → upload Python → run → stop → read output
 */

export class XRPSerial {
  constructor() {
    this.port = null;
    this.reader = null;
    this.writer = null;
    this.connected = false;
    this.decoder = new TextDecoder();
    this.encoder = new TextEncoder();

    // Event callbacks
    this.onConnect = null;
    this.onDisconnect = null;
    this.onData = null;
    this.onError = null;

    // Internal flag to stop read loop cleanly
    this._stopReading = false;
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
      this._stopReading = false;

      // Set up writer — acquire a single writer for the session
      this.writer = this.port.writable.getWriter();

      // Start reading in background (fire-and-forget, errors handled internally)
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
    this.connected = false;
    this._stopReading = true;

    // Cancel and release the reader first so the port can be closed
    if (this.reader) {
      try {
        await this.reader.cancel();
      } catch (_) { /* ignore */ }
      try {
        this.reader.releaseLock();
      } catch (_) { /* ignore */ }
      this.reader = null;
    }

    // Release writer lock, then close the writable side
    if (this.writer) {
      try {
        this.writer.releaseLock();
      } catch (_) { /* ignore */ }
      this.writer = null;
    }

    // Close the port
    if (this.port) {
      try {
        await this.port.close();
      } catch (_) { /* ignore */ }
      this.port = null;
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
    await this._delay(200);
  }

  /**
   * Enter raw REPL mode for clean code execution
   */
  async enterRawRepl() {
    // Interrupt anything running
    await this.interrupt();

    // Enter raw REPL mode (Ctrl+A)
    await this.send('\r\x01');
    await this._delay(200);
  }

  /**
   * Exit raw REPL mode back to normal (Ctrl+B)
   */
  async exitRawRepl() {
    await this.send('\x02');
    await this._delay(200);
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

      // Send the code followed by Ctrl+D to execute
      await this.send(pythonCode);
      await this._delay(50);
      await this.send('\x04');

      // Give the board a moment to start, then exit raw REPL
      await this._delay(200);
      await this.exitRawRepl();
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
   * Run code from blocks: execute directly via raw REPL
   */
  async runProgram(pythonCode) {
    if (!this.connected) {
      throw new Error('Not connected to XRP');
    }

    await this.executeCode(pythonCode);
  }

  /**
   * Start reading serial data in the background.
   * Uses a single reader that is held for the entire session.
   */
  async _startReading() {
    if (!this.port || !this.port.readable) return;

    // Acquire a single reader for the whole connection session
    this.reader = this.port.readable.getReader();

    try {
      while (!this._stopReading) {
        let result;
        try {
          result = await this.reader.read();
        } catch (err) {
          // Read error (e.g. device unplugged)
          if (this.connected && this.onError) this.onError(err);
          break;
        }

        if (result.done) break;

        if (result.value) {
          const text = this.decoder.decode(result.value);
          if (this.onData) this.onData(text);
        }
      }
    } finally {
      try {
        this.reader.releaseLock();
      } catch (_) { /* ignore */ }

      // If we exited the loop unexpectedly (device disconnected), trigger disconnect
      if (this.connected) {
        this.connected = false;
        this._stopReading = true;
        if (this.onDisconnect) this.onDisconnect();
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
