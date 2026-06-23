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
    // Split on newlines so serial output renders line-by-line
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (line.length > 0) {
        const span = document.createElement('span');
        span.className = `console-${type}`;
        span.textContent = line;
        this.container.appendChild(span);
      }
      // Insert a <br> after every segment except the last
      // (if the chunk ends with \n the last segment is empty, so we get a trailing newline)
      if (i < lines.length - 1) {
        this.container.appendChild(document.createElement('br'));
      }
    });

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
