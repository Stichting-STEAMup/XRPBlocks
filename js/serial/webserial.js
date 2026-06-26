/**
 * XRP Blocks — WebSerial Connection Manager
 * Handles USB serial: connect → read loop → disconnect.
 * REPL protocol (interrupt, raw REPL, executeCode, etc.) lives in XRPTransportBase.
 */

import { XRPTransportBase } from './base-transport.js';

export class XRPSerial extends XRPTransportBase {
  constructor() {
    super();

    // WebSerial-specific state
    this.port   = null;
    this.reader = null;
    this.writer = null;

    // Internal flag to stop the read loop cleanly
    this._stopReading = false;
  }

  // ── Static capability check ───────────────────────────────────────────────

  static isSupported() {
    return 'serial' in navigator;
  }

  // ── Connect / Disconnect ──────────────────────────────────────────────────

  async connect() {
    if (!XRPSerial.isSupported()) {
      throw new Error(
        'WebSerial is not supported in this browser. Please use Chrome or Edge.'
      );
    }

    try {
      // Request a serial port — user will see a browser picker dialog
      this.port = await navigator.serial.requestPort();

      // Open with standard MicroPython REPL settings
      await this.port.open({
        baudRate:    115200,
        dataBits:    8,
        stopBits:    1,
        parity:      'none',
        flowControl: 'none',
      });

      this.connected    = true;
      this._stopReading = false;

      // Acquire a single writer for the session
      this.writer = this.port.writable.getWriter();

      // Start reading in background (fire-and-forget)
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

  async disconnect() {
    this.connected    = false;
    this._stopReading = true;

    // Cancel and release the reader first so the port can be closed
    if (this.reader) {
      try { await this.reader.cancel(); }  catch (_) { /* ignore */ }
      try { this.reader.releaseLock(); }   catch (_) { /* ignore */ }
      this.reader = null;
    }

    // Release writer lock
    if (this.writer) {
      try { this.writer.releaseLock(); } catch (_) { /* ignore */ }
      this.writer = null;
    }

    // Close the port
    if (this.port) {
      try { await this.port.close(); } catch (_) { /* ignore */ }
      this.port = null;
    }

    if (this.onDisconnect) this.onDisconnect();
  }

  // ── Send ──────────────────────────────────────────────────────────────────

  async send(data) {
    if (!this.connected || !this.writer) {
      throw new Error('Not connected to XRP');
    }
    await this.writer.write(this.encoder.encode(data));
  }

  // ── Private read loop ─────────────────────────────────────────────────────

  /**
   * Start reading serial data in the background.
   * Uses a single reader held for the entire session.
   */
  async _startReading() {
    if (!this.port || !this.port.readable) return;

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
      try { this.reader.releaseLock(); } catch (_) { /* ignore */ }

      // If we exited the loop unexpectedly (device disconnected), trigger disconnect
      if (this.connected) {
        this.connected    = false;
        this._stopReading = true;
        if (this.onDisconnect) this.onDisconnect();
      }
    }
  }
}
