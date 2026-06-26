/**
 * XRP Blocks — Web Bluetooth Connection Manager
 *
 * Connects to the XRP robot over BLE using the Nordic UART Service (NUS).
 * UUIDs sourced from Open-STEM/XRPWeb bluetoothconnection.ts (the official XRP web IDE).
 *
 * Service:  6e400001-b5a3-f393-e0a9-e50e24dcca9e  (NUS)
 * TX char:  6e400002-b5a3-f393-e0a9-e50e24dcca9e  (PC → Board, Write)
 * RX char:  6e400003-b5a3-f393-e0a9-e50e24dcca9e  (Board → PC, Notify)
 */

import { XRPTransportBase } from './base-transport.js';

// Nordic UART Service UUIDs (confirmed from Open-STEM/XRPWeb source)
const UART_SERVICE_UUID  = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const TX_CHAR_UUID       = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // PC → Board (Write)
const RX_CHAR_UUID       = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // Board → PC (Notify)

export class XRPBluetooth extends XRPTransportBase {
  constructor() {
    super();

    // BLE GATT handles
    this._device    = null;
    this._server    = null;
    this._txChar    = null; // Write characteristic (PC → Board)
    this._rxChar    = null; // Notify characteristic (Board → PC)

    // Bound handler so we can remove it on disconnect
    this._onNotify  = this._handleNotify.bind(this);
    this._onGattDisconnect = this._handleGattDisconnect.bind(this);
  }

  // ── Static capability check ───────────────────────────────────────────────

  static isSupported() {
    return 'bluetooth' in navigator;
  }

  // ── Connect / Disconnect ──────────────────────────────────────────────────

  async connect() {
    if (!XRPBluetooth.isSupported()) {
      throw new Error(
        'Web Bluetooth is not supported in this browser. Please use Chrome or Edge.'
      );
    }

    try {
      // Filter by device name prefix — the XRP doesn't advertise the UART service UUID
      // in its BLE advertisement packets, so a services filter hides it from the list.
      // This matches the approach used by xrpcode.wpi.edu (Open-STEM/XRPWeb).
      this._device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'XRP' }],
        optionalServices: [UART_SERVICE_UUID],
      });

      // Listen for unexpected disconnection (e.g. robot powered off)
      this._device.addEventListener('gattserverdisconnected', this._onGattDisconnect);

      // Connect to the GATT server
      this._server = await this._device.gatt.connect();

      // Get the NUS service
      const service = await this._server.getPrimaryService(UART_SERVICE_UUID);

      // TX characteristic: used to WRITE from browser → board
      this._txChar = await service.getCharacteristic(TX_CHAR_UUID);

      // RX characteristic: used to receive NOTIFICATIONS from board → browser
      this._rxChar = await service.getCharacteristic(RX_CHAR_UUID);
      await this._rxChar.startNotifications();
      this._rxChar.addEventListener('characteristicvaluechanged', this._onNotify);

      this.connected = true;
      if (this.onConnect) this.onConnect();

    } catch (err) {
      if (err.name === 'NotFoundError') {
        // User cancelled the picker — not an error
        return;
      }
      this.connected = false;
      if (this.onError) this.onError(err);
      throw err;
    }
  }

  async disconnect() {
    this.connected = false;

    // Stop notifications and remove listener
    if (this._rxChar) {
      try {
        await this._rxChar.stopNotifications();
      } catch (_) { /* ignore */ }
      this._rxChar.removeEventListener('characteristicvaluechanged', this._onNotify);
      this._rxChar = null;
    }

    this._txChar = null;

    // Remove GATT disconnect listener before intentional disconnect to avoid echo
    if (this._device) {
      this._device.removeEventListener('gattserverdisconnected', this._onGattDisconnect);
    }

    // Disconnect from GATT server
    if (this._server && this._server.connected) {
      try {
        this._server.disconnect();
      } catch (_) { /* ignore */ }
    }

    this._server = null;
    this._device = null;

    if (this.onDisconnect) this.onDisconnect();
  }

  // ── Send ──────────────────────────────────────────────────────────────────

  /**
   * Write data to the TX characteristic (PC → Board).
   * BLE packets have a max size (typically 512 bytes for Write Without Response,
   * but conservatively chunked at 20 bytes for broad compatibility).
   */
  async send(data) {
    if (!this.connected || !this._txChar) {
      throw new Error('Not connected to XRP');
    }

    const bytes = this.encoder.encode(data);
    const CHUNK = 200; // Most BLE stacks can handle ≥20 bytes; 200 is safe for Pico W

    for (let i = 0; i < bytes.length; i += CHUNK) {
      const chunk = bytes.slice(i, i + CHUNK);
      await this._txChar.writeValue(chunk);
      // Small gap between chunks to avoid overwhelming the BLE buffer
      if (bytes.length > CHUNK) await this._delay(20);
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /**
   * Called when the board sends a BLE notification (Board → PC data).
   */
  _handleNotify(event) {
    const value = event.target.value; // DataView
    const text = this.decoder.decode(value);
    if (this.onData) this.onData(text);
  }

  /**
   * Called when the BLE device disconnects unexpectedly (e.g. power-off).
   */
  _handleGattDisconnect() {
    if (!this.connected) return; // already intentionally disconnected
    this.connected = false;
    this._txChar = null;
    this._rxChar = null;
    this._server = null;
    if (this.onDisconnect) this.onDisconnect();
  }
}
