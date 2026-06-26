/**
 * XRP Blocks — Base Transport
 * Shared MicroPython raw-REPL protocol logic.
 * Subclasses (XRPSerial, XRPBluetooth) implement connect / disconnect / send / _startReading.
 */

export class XRPTransportBase {
  constructor() {
    this.connected = false;
    this.decoder = new TextDecoder();
    this.encoder = new TextEncoder();

    // Event callbacks (assigned by app.js)
    this.onConnect = null;
    this.onDisconnect = null;
    this.onData = null;
    this.onError = null;
  }

  // ── Abstract interface (must be implemented by subclass) ──────────────────

  /**
   * Open the physical connection and begin reading.
   * Subclass must set this.connected = true and call this.onConnect?.() when ready.
   */
  async connect() {
    throw new Error('connect() must be implemented by subclass');
  }

  /**
   * Close the physical connection.
   * Subclass must set this.connected = false and call this.onDisconnect?.() when done.
   */
  async disconnect() {
    throw new Error('disconnect() must be implemented by subclass');
  }

  /**
   * Send raw bytes to the device.
   * @param {string} data - UTF-8 string to encode and send
   */
  async send(data) {
    throw new Error('send() must be implemented by subclass');
  }

  // ── Shared MicroPython REPL protocol ──────────────────────────────────────

  /**
   * Interrupt any running program (Ctrl+C ×2)
   */
  async interrupt() {
    await this.send('\r\x03\x03');
    await this._delay(200);
  }

  /**
   * Enter raw REPL mode (Ctrl+A)
   */
  async enterRawRepl() {
    await this.interrupt();
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
   * @param {string} pythonCode
   */
  async executeCode(pythonCode) {
    if (!this.connected) {
      throw new Error('Not connected to XRP');
    }

    try {
      await this.enterRawRepl();
      await this.send(pythonCode);
      await this._delay(50);
      await this.send('\x04'); // Ctrl+D — execute
      await this._delay(200);
      await this.exitRawRepl();
    } catch (err) {
      if (this.onError) this.onError(err);
      throw err;
    }
  }

  /**
   * Stop a running program (Ctrl+C + exit raw REPL)
   */
  async stopExecution() {
    if (!this.connected) return;
    await this.interrupt();
    await this.exitRawRepl();
  }

  /**
   * Trigger a soft reboot of the MicroPython board (Ctrl+D in normal REPL)
   */
  async softReboot() {
    if (!this.connected) {
      throw new Error('Not connected to XRP');
    }
    await this.exitRawRepl();
    await this.send('\x04');
    await this._delay(200);
  }

  /**
   * Upload a Python file to the XRP filesystem via raw REPL
   * @param {string} filename
   * @param {string} content
   */
  async uploadFile(filename, content) {
    const escapedContent = content
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n');

    const writeCode =
      `f = open('${filename}', 'w')\n` +
      `f.write('${escapedContent}')\n` +
      `f.close()\n` +
      `print('File saved: ${filename}')\n`;

    await this.executeCode(writeCode);

    if (filename === 'main.py') {
      await this.softReboot();
    }
  }

  /**
   * Run code directly via raw REPL
   * @param {string} pythonCode
   */
  async runProgram(pythonCode) {
    if (!this.connected) {
      throw new Error('Not connected to XRP');
    }
    await this.executeCode(pythonCode);
  }

  // ── Utility ───────────────────────────────────────────────────────────────

  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
