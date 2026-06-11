/**
 * XRP Blocks — Board block definitions
 * Maps to XRPLib Board API + general utilities
 */

export function registerBoardBlocks() {
  // --- Start (Hat Block) ---
  Blockly.Blocks['xrp_start'] = {
    init() {
      this.jsonInit({
        type: 'xrp_start',
        message0: 'when program starts',
        nextStatement: null,
        style: 'events_blocks',
        tooltip: 'The starting point for the program.',
        helpUrl: '',
      });
      this.setDeletable(false);
    },
  };

  // --- LED On ---
  Blockly.Blocks['xrp_led_on'] = {
    init() {
      this.jsonInit({
        type: 'xrp_led_on',
        message0: 'turn LED on',
        previousStatement: null,
        nextStatement: null,
        style: 'board_blocks',
        tooltip: 'Turn the onboard LED on.',
        helpUrl: '',
      });
    },
  };

  // --- LED Off ---
  Blockly.Blocks['xrp_led_off'] = {
    init() {
      this.jsonInit({
        type: 'xrp_led_off',
        message0: 'turn LED off',
        previousStatement: null,
        nextStatement: null,
        style: 'board_blocks',
        tooltip: 'Turn the onboard LED off.',
        helpUrl: '',
      });
    },
  };

  // --- LED Blink ---
  Blockly.Blocks['xrp_led_blink'] = {
    init() {
      this.jsonInit({
        type: 'xrp_led_blink',
        message0: 'blink LED %1 times with %2 s delay',
        args0: [
          { type: 'input_value', name: 'COUNT', check: 'Number' },
          { type: 'input_value', name: 'DELAY', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'board_blocks',
        tooltip: 'Blink the onboard LED a number of times.',
        helpUrl: '',
      });
    },
  };

  // --- RGB LED ---
  Blockly.Blocks['xrp_rgb_led'] = {
    init() {
      this.jsonInit({
        type: 'xrp_rgb_led',
        message0: 'set RGB LED red %1 green %2 blue %3',
        args0: [
          { type: 'input_value', name: 'RED', check: 'Number' },
          { type: 'input_value', name: 'GREEN', check: 'Number' },
          { type: 'input_value', name: 'BLUE', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'board_blocks',
        tooltip: 'Set the RGB LED color (0–255 for each channel).',
        helpUrl: '',
      });
    },
  };

  // --- Wait / Sleep ---
  Blockly.Blocks['xrp_wait_seconds'] = {
    init() {
      this.jsonInit({
        type: 'xrp_wait_seconds',
        message0: 'wait %1 seconds',
        args0: [
          { type: 'input_value', name: 'SECONDS', check: 'Number' },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'board_blocks',
        tooltip: 'Pause the program for a number of seconds.',
        helpUrl: '',
      });
    },
  };

  // --- Print ---
  Blockly.Blocks['xrp_print'] = {
    init() {
      this.jsonInit({
        type: 'xrp_print',
        message0: 'print %1',
        args0: [
          { type: 'input_value', name: 'TEXT' },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'board_blocks',
        tooltip: 'Print a message to the console.',
        helpUrl: '',
      });
    },
  };
}
