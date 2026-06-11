/**
 * XRP Blocks — Console Panel
 * Shows serial output from the XRP robot.
 */

export class ConsolePanel {
  constructor(containerEl) {
    this.container = containerEl;
    this._autoScroll = true;
  }

  /**
   * Append received data to the console
   */
  appendData(text, type = 'received') {
    const span = document.createElement('span');
    span.className = `console-${type}`;
    span.textContent = text;
    this.container.appendChild(span);

    if (this._autoScroll) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  /**
   * Append a system message (italicized, muted)
   */
  appendSystem(message) {
    this.appendData(message + '\n', 'system');
  }

  /**
   * Append an error message
   */
  appendError(message) {
    this.appendData(message + '\n', 'error');
  }

  /**
   * Clear all console output
   */
  clear() {
    this.container.innerHTML = '';
  }
}
