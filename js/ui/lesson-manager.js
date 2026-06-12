/**
 * XRP Blocks — Lesson Manager
 *
 * Manages the procedural tutorial panel displayed above the Blockly workspace.
 * Handles step navigation, progress display, and toolbox filtering per lesson.
 *
 * Expected lesson JSON format:
 * {
 *   "title": "Lesson 1: Drive Straight",
 *   "steps": ["Step 1 text...", "Step 2 text..."],
 *   "toolbox": {
 *     "Events": [],           // all blocks in Events shown
 *     "Drive": ["xrp_drive_straight"]  // only this block in Drive shown
 *   }
 * }
 * If "toolbox" is omitted or {}, all categories are shown.
 */

export class LessonManager {
  /**
   * @param {Object} options
   * @param {Function} options.onToolboxChange - Called with (toolboxFilter) when lesson loads/exits.
   *   toolboxFilter is null to restore full toolbox, or the lesson's toolbox object.
   * @param {Function} options.onResize - Called after panel shows/hides so Blockly can resize.
   */
  constructor({ onToolboxChange, onResize }) {
    this.onToolboxChange = onToolboxChange;
    this.onResize = onResize;

    this.currentLesson = null;
    this.currentStep = 0;

    this._panel = document.getElementById('lesson-panel');
    this._bindStaticElements();
  }

  // ── Public API ──

  /**
   * Load a lesson object and show the panel.
   * @param {Object} lesson - Parsed lesson JSON
   */
  load(lesson) {
    if (!lesson || !Array.isArray(lesson.steps) || lesson.steps.length === 0) {
      console.error('[LessonManager] Invalid lesson: must have a non-empty steps array.');
      return false;
    }

    this.currentLesson = lesson;
    this.currentStep = 0;

    // Apply toolbox filter
    this.onToolboxChange?.(lesson.toolbox || null);

    this._render();
    this._showPanel();

    return true;
  }

  /**
   * Exit the current lesson — hides panel and restores full toolbox.
   */
  exit() {
    this.currentLesson = null;
    this.currentStep = 0;

    // Restore full toolbox
    this.onToolboxChange?.(null);

    this._hidePanel();
  }

  // ── Private: Panel rendering ──

  _bindStaticElements() {
    if (!this._panel) {
      console.error('[LessonManager] #lesson-panel element not found in DOM.');
      return;
    }

    this._titleEl = this._panel.querySelector('.lesson-panel__title');
    this._progressBar = this._panel.querySelector('.lesson-panel__progress-fill');
    this._stepCountEl = this._panel.querySelector('.lesson-panel__step-count');
    this._stepTextEl = this._panel.querySelector('.lesson-panel__step-text');
    this._prevBtn = this._panel.querySelector('#btn-lesson-prev');
    this._nextBtn = this._panel.querySelector('#btn-lesson-next');
    this._closeBtn = this._panel.querySelector('#btn-lesson-close');

    this._prevBtn?.addEventListener('click', () => this._navigate(-1));
    this._nextBtn?.addEventListener('click', () => this._navigate(1));
    this._closeBtn?.addEventListener('click', () => this.exit());
  }

  _render() {
    const lesson = this.currentLesson;
    if (!lesson) return;

    const total = lesson.steps.length;
    const stepIndex = this.currentStep;
    const progress = total === 1 ? 100 : Math.round((stepIndex / (total - 1)) * 100);

    // Title
    if (this._titleEl) {
      this._titleEl.textContent = lesson.title || 'Lesson';
    }

    // Progress bar
    if (this._progressBar) {
      this._progressBar.style.width = `${progress}%`;
    }

    // Step count
    if (this._stepCountEl) {
      this._stepCountEl.textContent = `Step ${stepIndex + 1} of ${total}`;
    }

    // Step text (allows basic HTML)
    if (this._stepTextEl) {
      this._stepTextEl.innerHTML = lesson.steps[stepIndex] || '';
      // Animate the text in
      this._stepTextEl.classList.remove('lesson-step--animating');
      // Force reflow
      void this._stepTextEl.offsetWidth;
      this._stepTextEl.classList.add('lesson-step--animating');
    }

    // Navigation button states
    if (this._prevBtn) {
      this._prevBtn.disabled = stepIndex === 0;
    }
    if (this._nextBtn) {
      const isLast = stepIndex === total - 1;
      this._nextBtn.textContent = '';
      this._nextBtn.innerHTML = isLast
        ? `<span>Finish</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<span>Next</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

      this._nextBtn.classList.toggle('lesson-panel__btn--finish', isLast);
    }
  }

  _navigate(delta) {
    if (!this.currentLesson) return;

    const total = this.currentLesson.steps.length;
    const next = this.currentStep + delta;

    if (next < 0) return;

    if (next >= total) {
      // Last step "Finish" → exit lesson
      this.exit();
      return;
    }

    this.currentStep = next;
    this._render();
  }

  _showPanel() {
    if (!this._panel) return;
    this._panel.classList.remove('lesson-panel--hidden');
    this._panel.classList.add('lesson-panel--visible');
    // Give browser a frame to apply transition
    requestAnimationFrame(() => {
      this._panel.style.maxHeight = '220px';
      this._panel.style.opacity = '1';
    });
    setTimeout(() => this.onResize?.(), 320);
  }

  _hidePanel() {
    if (!this._panel) return;
    this._panel.style.maxHeight = '0';
    this._panel.style.opacity = '0';
    setTimeout(() => {
      this._panel.classList.remove('lesson-panel--visible');
      this._panel.classList.add('lesson-panel--hidden');
      this.onResize?.();
    }, 320);
  }
}
