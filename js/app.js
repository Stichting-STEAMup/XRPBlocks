/**
 * XRP Blocks — Main Application
 * Orchestrates Blockly workspace, WebSerial, and UI components.
 */

import { createXRPTheme } from './blockly/theme.js';
import { getToolboxDefinition } from './blockly/toolbox.js';
import { registerDrivetrainBlocks } from './blockly/blocks/drivetrain.js';
import { registerMotorBlocks } from './blockly/blocks/motors.js';
import { registerServoBlocks } from './blockly/blocks/servo.js';
import { registerSensorBlocks } from './blockly/blocks/sensors.js';
import { registerBoardBlocks } from './blockly/blocks/board.js';
import { registerDrivetrainGenerators } from './blockly/generators/drivetrain.js';
import { registerMotorGenerators } from './blockly/generators/motors.js';
import { registerServoGenerators } from './blockly/generators/servo.js';
import { registerSensorGenerators } from './blockly/generators/sensors.js';
import { registerBoardGenerators } from './blockly/generators/board.js';
import { registerCustomCategory } from './blockly/custom-category.js';
import { XRPSerial } from './serial/webserial.js';
import { Toolbar } from './ui/toolbar.js';
import { PythonPanel } from './ui/python-panel.js';
import { ConsolePanel } from './ui/console-panel.js';

class XRPBlocksApp {
  constructor() {
    this.workspace = null;
    this.serial = new XRPSerial();
    this.pythonPanel = null;
    this.consolePanel = null;
    this.toolbar = null;
    this._pythonGenerator = null;
  }

  /**
   * Initialize the entire application
   */
  init() {
    // Register custom category renderer
    registerCustomCategory();

    // Register all custom blocks
    this._registerBlocks();

    // Create and inject Blockly workspace
    this._initWorkspace();

    // Set up Python generator
    this._initGenerator();

    // Initialize UI components
    this._initUI();

    // Set up WebSerial callbacks
    this._initSerial();

    // Set up workspace change listener for live code gen
    this._initLiveCodeGen();

    // Handle window resize
    this._initResize();

    // Load saved workspace from localStorage
    this._loadWorkspace();

    // Initial code generation
    this._generateCode();

    console.log('🤖 XRP Blocks IDE initialized');
  }

  // ── Block Registration ──

  _registerBlocks() {
    registerDrivetrainBlocks();
    registerMotorBlocks();
    registerServoBlocks();
    registerSensorBlocks();
    registerBoardBlocks();
  }

  // ── Workspace ──

  _initWorkspace() {
    const theme = createXRPTheme();
    const toolbox = getToolboxDefinition();

    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox,
      theme,
      renderer: 'zelos',
      grid: {
        spacing: 25,
        length: 3,
        colour: '#E2E6EF',
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.9,
        maxScale: 2,
        minScale: 0.3,
        scaleSpeed: 1.1,
        pinch: true,
      },
      trashcan: true,
      move: {
        scrollbars: {
          horizontal: true,
          vertical: true,
        },
        drag: true,
        wheel: true,
      },
      sounds: true,
      media: 'js/vendor/blockly/media/',
    });
  }

  // ── Python Generator ──

  _initGenerator() {
    const pythonModule = window.python || window.blocklyPython;
    if (!pythonModule || !pythonModule.pythonGenerator) {
      console.error('Failed to find Blockly Python generator module.');
      this._showToast('Failed to load Python generator module', 'error');
      return;
    }
    
    this._pythonGenerator = pythonModule.pythonGenerator;

    // Register XRP-specific generators
    registerDrivetrainGenerators(pythonModule);
    registerMotorGenerators(pythonModule);
    registerServoGenerators(pythonModule);
    registerSensorGenerators(pythonModule);
    registerBoardGenerators(pythonModule);
  }

  _generateCode() {
    try {
      if (!this._pythonGenerator) return '';
      
      let code = this._pythonGenerator.workspaceToCode(this.workspace);

      // Build the preamble: always include XRP import, plus any
      // additional imports added by generators (e.g., 'import time')
      const imports = ['from XRPLib.defaults import *'];

      // Collect any definitions the generators added
      const defs = this._pythonGenerator.definitions_ || {};
      for (const [key, value] of Object.entries(defs)) {
        if (key !== 'xrp_import' && !imports.includes(value)) {
          imports.push(value);
        }
      }

      const preamble = imports.join('\n') + '\n\n';
      code = preamble + code;

      this.pythonPanel?.update(code);
      return code;
    } catch (err) {
      console.error('Code generation error:', err);
      return '';
    }
  }

  // ── UI Components ──

  _initUI() {
    // Python preview panel
    const pythonEl = document.getElementById('python-code');
    this.pythonPanel = new PythonPanel(pythonEl);

    // Console panel
    const consoleEl = document.getElementById('console-output');
    this.consolePanel = new ConsolePanel(consoleEl);

    // Toolbar
    this.toolbar = new Toolbar({
      onConnect: () => this._handleConnect(),
      onRun: () => this._handleRun(),
      onStop: () => this._handleStop(),
      onSave: () => this._saveWorkspace(),
      onLoad: () => this._loadFromFile(),
    });

    // Bottom panel tabs
    this._initPanelTabs();

    // Copy button
    document.getElementById('btn-copy-code')?.addEventListener('click', async () => {
      const success = await this.pythonPanel.copyToClipboard();
      if (success) this._showToast('Code copied!');
    });

    // Console clear
    document.getElementById('btn-clear-console')?.addEventListener('click', () => {
      this.consolePanel.clear();
    });

    // Panel collapse toggle
    document.getElementById('btn-collapse-panel')?.addEventListener('click', () => {
      this._toggleBottomPanel();
    });
    document.getElementById('btn-collapse-panel-2')?.addEventListener('click', () => {
      this._toggleBottomPanel();
    });

    // Check WebSerial support
    if (!XRPSerial.isSupported()) {
      this.toolbar.setConnected(false);
      document.getElementById('btn-connect').title = 'WebSerial not supported — use Chrome or Edge';
    }
  }

  _initPanelTabs() {
    const tabs = document.querySelectorAll('.bottom-panel__tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        const panel = document.querySelector('.bottom-panel');
        const isCollapsed = panel.classList.contains('collapsed');
        const isAlreadyActive = tab.classList.contains('active');

        if (isCollapsed) {
          // If panel is closed, clicking either tab opens it to that specific tab
          this._setPanelState(true, target);
        } else {
          // Panel is open
          if (isAlreadyActive) {
            // Clicking the active tab closes the panel (neither tab is active)
            this._setPanelState(false);
          } else {
            // Clicking a different tab switches to that tab (keeps panel open)
            this._setPanelState(true, target);
          }
        }
      });
    });
  }

  _toggleBottomPanel() {
    const panel = document.querySelector('.bottom-panel');
    const isCollapsed = panel.classList.contains('collapsed');
    
    if (isCollapsed) {
      // If closed, default to opening the python tab
      this._setPanelState(true, 'python');
    } else {
      // If open, close it
      this._setPanelState(false);
    }
  }

  _setPanelState(isOpen, targetTab = 'python') {
    const panel = document.querySelector('.bottom-panel');
    const tabs = document.querySelectorAll('.bottom-panel__tab');
    const views = document.querySelectorAll('.panel-view');

    if (isOpen) {
      panel.classList.remove('collapsed');

      tabs.forEach(t => {
        if (t.dataset.tab === targetTab) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      views.forEach(v => {
        if (v.id === `panel-${targetTab}`) {
          v.classList.add('active');
        } else {
          v.classList.remove('active');
        }
      });

      // Update actions visibility
      const pythonActions = document.getElementById('python-actions');
      const consoleActions = document.getElementById('console-actions');
      if (pythonActions) pythonActions.style.display = targetTab === 'python' ? 'flex' : 'none';
      if (consoleActions) consoleActions.style.display = targetTab === 'console' ? 'flex' : 'none';

      // Update collapse button tooltip to indicate close behavior
      const collapseBtn1 = document.getElementById('btn-collapse-panel');
      const collapseBtn2 = document.getElementById('btn-collapse-panel-2');
      if (collapseBtn1) collapseBtn1.setAttribute('data-tooltip', 'Collapse panel');
      if (collapseBtn2) collapseBtn2.setAttribute('data-tooltip', 'Collapse panel');
    } else {
      panel.classList.add('collapsed');

      // Deactivate all tabs and views so neither is active when closed
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));

      // Update collapse button tooltip to indicate open behavior
      const collapseBtn1 = document.getElementById('btn-collapse-panel');
      const collapseBtn2 = document.getElementById('btn-collapse-panel-2');
      if (collapseBtn1) collapseBtn1.setAttribute('data-tooltip', 'Expand panel');
      if (collapseBtn2) collapseBtn2.setAttribute('data-tooltip', 'Expand panel');
    }

    // Resize Blockly workspace after animation finishes
    setTimeout(() => {
      Blockly.svgResize(this.workspace);
    }, 320);
  }

  // ── WebSerial ──

  _initSerial() {
    this.serial.onConnect = () => {
      this.toolbar.setConnected(true);
      this.consolePanel.appendSystem('✓ Connected to XRP');
    };

    this.serial.onDisconnect = () => {
      this.toolbar.setConnected(false);
      this.toolbar.setRunning(false);
      this.consolePanel.appendSystem('✗ Disconnected from XRP');
    };

    this.serial.onData = (text) => {
      this.consolePanel.appendData(text, 'received');
    };

    this.serial.onError = (err) => {
      this.consolePanel.appendError(`Error: ${err.message}`);
    };
  }

  async _handleConnect() {
    if (this.serial.connected) {
      await this.serial.disconnect();
    } else {
      try {
        await this.serial.connect();
      } catch (err) {
        this._showToast('Failed to connect: ' + err.message, 'error');
      }
    }
  }

  async _handleRun() {
    const code = this._generateCode();
    if (!code.trim()) {
      this._showToast('No code to run — add some blocks first!', 'error');
      return;
    }

    // Switch to console tab
    document.querySelector('[data-tab="console"]')?.click();

    this.toolbar.setRunning(true);
    this.consolePanel.appendSystem('▶ Running program...');

    try {
      await this.serial.runProgram(code);
    } catch (err) {
      this.consolePanel.appendError(`Run error: ${err.message}`);
      this._showToast('Failed to run: ' + err.message, 'error');
    }

    // After a short delay, set running to false
    // (in a real implementation, we'd detect when the program finishes)
    setTimeout(() => {
      this.toolbar.setRunning(false);
    }, 2000);
  }

  async _handleStop() {
    try {
      await this.serial.stopExecution();
      this.consolePanel.appendSystem('⏹ Program stopped');
      this.toolbar.setRunning(false);
    } catch (err) {
      this.consolePanel.appendError(`Stop error: ${err.message}`);
    }
  }

  // ── Live Code Generation ──

  _initLiveCodeGen() {
    this.workspace.addChangeListener((event) => {
      // Only regenerate on meaningful changes
      if (event.isUiEvent) return;
      if (event.type === Blockly.Events.FINISHED_LOADING) return;

      this._disableOrphans();
      this._generateCode();

      // Auto-save to localStorage on change (debounced)
      clearTimeout(this._saveTimeout);
      this._saveTimeout = setTimeout(() => this._autoSave(), 1000);
    });
  }

  _disableOrphans() {
    const validRoots = ['xrp_start', 'procedures_defnoreturn', 'procedures_defreturn'];
    const topBlocks = this.workspace.getTopBlocks();
    
    for (const block of topBlocks) {
      if (validRoots.includes(block.type)) {
        if (!block.isEnabled()) block.setDisabledReason(false, 'orphan');
        
        // Ensure all children are enabled
        const descendants = block.getDescendants(false);
        for (const desc of descendants) {
          if (!desc.isEnabled()) desc.setDisabledReason(false, 'orphan');
        }
      } else {
        // If it's not a valid root, disable it and all children
        const descendants = block.getDescendants(false);
        for (const desc of descendants) {
          if (desc.isEnabled()) desc.setDisabledReason(true, 'orphan');
        }
      }
    }
  }

  // ── Save / Load ──

  _autoSave() {
    try {
      const state = Blockly.serialization.workspaces.save(this.workspace);
      localStorage.setItem('xrp_blocks_workspace', JSON.stringify(state));
    } catch (err) {
      console.warn('Auto-save failed:', err);
    }
  }

  _saveWorkspace() {
    const state = Blockly.serialization.workspaces.save(this.workspace);
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'xrp-blocks-project.json';
    a.click();
    URL.revokeObjectURL(url);
    this._showToast('Project saved!');
  }

  _loadWorkspace() {
    try {
      const saved = localStorage.getItem('xrp_blocks_workspace');
      if (saved) {
        const state = JSON.parse(saved);
        Blockly.serialization.workspaces.load(state, this.workspace);
      }
    } catch (err) {
      console.warn('Failed to load saved workspace:', err);
    }

    // Ensure there is at least one start block
    const topBlocks = this.workspace.getTopBlocks();
    const hasStart = topBlocks.some(b => b.type === 'xrp_start');
    if (!hasStart) {
      const startBlock = this.workspace.newBlock('xrp_start');
      startBlock.initSvg();
      startBlock.render();
      startBlock.moveBy(50, 50);
    }
  }

  _loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const state = JSON.parse(text);
        Blockly.serialization.workspaces.load(state, this.workspace);
        this._showToast('Project loaded!');
      } catch (err) {
        this._showToast('Failed to load file', 'error');
      }
    };
    input.click();
  }

  // ── Resize ──

  _initResize() {
    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(this.workspace);
    });
    resizeObserver.observe(document.getElementById('blocklyDiv'));

    // Also handle panel resize drag
    this._initPanelResize();
  }

  _initPanelResize() {
    const panel = document.querySelector('.bottom-panel');
    const handle = document.querySelector('.bottom-panel__resize');
    if (!handle || !panel) return;

    let startY, startHeight;

    handle.addEventListener('mousedown', (e) => {
      startY = e.clientY;
      startHeight = panel.offsetHeight;
      panel.classList.remove('collapsed');

      const onMouseMove = (e) => {
        const delta = startY - e.clientY;
        const newHeight = Math.max(100, Math.min(window.innerHeight * 0.6, startHeight + delta));
        panel.style.height = newHeight + 'px';
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        Blockly.svgResize(this.workspace);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  // ── Toast Notifications ──

  _showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast toast--${type}`;

    // Trigger show
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2500);
  }
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  const app = new XRPBlocksApp();
  app.init();
});
