/**
 * XRP Blocks — Toolbar UI Component
 */

export class Toolbar {
  constructor({ onConnect, onRun, onStop, onDeploy, onSave, onLoad, onLoadLesson }) {
    this.onConnect = onConnect;
    this.onRun = onRun;
    this.onStop = onStop;
    this.onDeploy = onDeploy;
    this.onSave = onSave;
    this.onLoad = onLoad;
    this.onLoadLesson = onLoadLesson;

    this._connected = false;
    this._running = false;

    this._bindElements();
    this._bindEvents();
  }

  _bindElements() {
    this.connectBtn = document.getElementById('btn-connect');
    this.runBtn = document.getElementById('btn-run');
    this.stopBtn = document.getElementById('btn-stop');
    this.deployBtn = document.getElementById('btn-deploy');
    this.saveBtn = document.getElementById('btn-save');
    this.loadBtn = document.getElementById('btn-load');
    this.loadLessonBtn = document.getElementById('btn-load-lesson');
    this.statusDot = document.getElementById('connection-dot');
    this.statusText = document.getElementById('connection-text');
  }

  _bindEvents() {
    this.connectBtn?.addEventListener('click', () => this.onConnect?.());
    this.runBtn?.addEventListener('click', () => this.onRun?.());
    this.stopBtn?.addEventListener('click', () => this.onStop?.());
    this.deployBtn?.addEventListener('click', () => this.onDeploy?.());
    this.saveBtn?.addEventListener('click', () => this.onSave?.());
    this.loadBtn?.addEventListener('click', () => this.onLoad?.());
    this.loadLessonBtn?.addEventListener('click', () => this.onLoadLesson?.());
  }

  setConnected(connected) {
    this._connected = connected;

    if (connected) {
      this.connectBtn.textContent = '';
      this.connectBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
          <line x1="12" y1="2" x2="12" y2="12"/>
        </svg>
        <span class="btn-label">${Blockly.Msg['UI_DISCONNECT'] || 'Disconnect'}</span>
      `;
      this.connectBtn.classList.add('connected');
      this.statusDot?.classList.add('connected');
      if (this.statusText) this.statusText.textContent = Blockly.Msg['UI_CONNECTED'] || 'Connected';
      this.runBtn.disabled = false;
      if (this.deployBtn) this.deployBtn.disabled = false;
    } else {
      this.connectBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="10" cy="7" r="1" />
          <circle cx="4" cy="20" r="1" />
          <path d="M4.7 19.3 19 5" />
          <path d="m21 3-3 1 2 2Z" />
          <path d="M9.26 7.68 5 12l2 5" />
          <path d="m10 14 5 2 3.5-3.5" />
          <path d="m18 12 1-1 1 1-1 1Z" />
        </svg>
        <span class="btn-label">${Blockly.Msg['UI_CONNECT'] || 'Connect XRP'}</span>
      `;
      this.connectBtn.classList.remove('connected');
      this.statusDot?.classList.remove('connected');
      if (this.statusText) this.statusText.textContent = Blockly.Msg['UI_DISCONNECTED'] || 'Disconnected';
      this.runBtn.disabled = true;
      if (this.deployBtn) this.deployBtn.disabled = true;
    }

    this._updateRunStopVisibility();
  }

  setRunning(running) {
    this._running = running;
    this._updateRunStopVisibility();
  }

  _updateRunStopVisibility() {
    if (this._running) {
      this.runBtn.style.display = 'none';
      this.stopBtn.classList.add('visible');
    } else {
      this.runBtn.style.display = '';
      this.stopBtn.classList.remove('visible');
    }
  }
}
