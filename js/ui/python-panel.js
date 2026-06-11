/**
 * XRP Blocks — Python Preview Panel
 * Shows generated Python code with simple syntax highlighting.
 */

export class PythonPanel {
  constructor(containerEl) {
    this.container = containerEl;
    this._code = '';
  }

  /**
   * Update the displayed Python code
   */
  update(pythonCode) {
    this._code = pythonCode;
    this.container.innerHTML = this._highlight(pythonCode);
  }

  /**
   * Get the current Python code as plain text
   */
  getCode() {
    return this._code;
  }

  /**
   * Copy code to clipboard
   */
  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this._code);
      return true;
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this._code;
      textArea.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }

  /**
   * Simple Python syntax highlighting (regex-based, lightweight)
   */
  _highlight(code) {
    if (!code.trim()) {
      return '<span class="comment"># Drag blocks to start coding!\n# Your Python code will appear here.</span>';
    }

    // Escape HTML first
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Apply highlighting in order (later rules override earlier)
    // Comments
    html = html.replace(/(#.*$)/gm, '<span class="comment">$1</span>');

    // Strings (double and single quoted)
    html = html.replace(/(&quot;.*?&quot;|'[^']*'|"[^"]*")/g, '<span class="string">$1</span>');

    // Keywords
    const keywords = ['from', 'import', 'def', 'return', 'if', 'elif', 'else', 'for', 'while',
      'break', 'continue', 'pass', 'True', 'False', 'None', 'and', 'or', 'not', 'in',
      'is', 'class', 'try', 'except', 'finally', 'with', 'as', 'yield', 'lambda',
      'global', 'nonlocal', 'assert', 'del', 'raise'];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b(?![^<]*>)`, 'g');
    html = html.replace(kwRegex, '<span class="keyword">$1</span>');

    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b(?![^<]*>)/g, '<span class="number">$1</span>');

    // Function calls
    html = html.replace(/\b([a-zA-Z_]\w*)(?=\s*\()(?![^<]*>)/g, '<span class="function">$1</span>');

    return html;
  }
}
