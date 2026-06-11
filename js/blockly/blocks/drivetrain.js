/**
 * XRP Blocks — Drivetrain block definitions
 * Maps to XRPLib DifferentialDrive API
 */

export function registerDrivetrainBlocks() {

  // --- Drive Straight ---
  Blockly.Blocks['xrp_drive_straight'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_straight',
        message0: 'drive straight %1 cm',
        args0: [
          {
            type: 'input_value',
            name: 'DISTANCE',
            check: 'Number',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Drive the robot straight. Positive = forward, negative = backward.',
        helpUrl: '',
      });
    },
  };

  // --- Drive Straight (with effort) ---
  Blockly.Blocks['xrp_drive_straight_effort'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_straight_effort',
        message0: 'drive straight %1 cm at %2 % effort',
        args0: [
          { type: 'input_value', name: 'DISTANCE', check: 'Number' },
          { type: 'input_value', name: 'EFFORT', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Drive straight a distance at a specific effort (0–100%).',
        helpUrl: '',
      });
    },
  };

  // --- Turn ---
  Blockly.Blocks['xrp_drive_turn'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_turn',
        message0: 'turn %1 degrees',
        args0: [
          { type: 'input_value', name: 'ANGLE', check: 'Number' },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Turn the robot. Positive = right, negative = left.',
        helpUrl: '',
      });
    },
  };

  // --- Turn (with effort) ---
  Blockly.Blocks['xrp_drive_turn_effort'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_turn_effort',
        message0: 'turn %1 degrees at %2 % effort',
        args0: [
          { type: 'input_value', name: 'ANGLE', check: 'Number' },
          { type: 'input_value', name: 'EFFORT', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Turn a specific angle at a specific effort (0–100%).',
        helpUrl: '',
      });
    },
  };

  // --- Stop ---
  Blockly.Blocks['xrp_drive_stop'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_stop',
        message0: 'stop driving',
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Stop the robot immediately.',
        helpUrl: '',
      });
    },
  };

  // --- Set Drive Effort ---
  Blockly.Blocks['xrp_drive_set_effort'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_set_effort',
        message0: 'set drive effort left %1 right %2',
        args0: [
          { type: 'input_value', name: 'LEFT', check: 'Number' },
          { type: 'input_value', name: 'RIGHT', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Set left and right motor effort directly (-1 to 1).',
        helpUrl: '',
      });
    },
  };

  // --- Set Drive Speed ---
  Blockly.Blocks['xrp_drive_set_speed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_set_speed',
        message0: 'set drive speed left %1 right %2',
        args0: [
          { type: 'input_value', name: 'LEFT', check: 'Number' },
          { type: 'input_value', name: 'RIGHT', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Set the speed of the left and right motors.',
        helpUrl: '',
      });
    },
  };

  // --- Arcade Drive ---
  Blockly.Blocks['xrp_drive_arcade'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_arcade',
        message0: 'arcade drive speed %1 turn %2',
        args0: [
          { type: 'input_value', name: 'SPEED', check: 'Number' },
          { type: 'input_value', name: 'TURN', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Drive using arcade style: forward/backward speed and turning.',
        helpUrl: '',
      });
    },
  };

  // --- Get Left Encoder ---
  Blockly.Blocks['xrp_drive_get_left_encoder'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_get_left_encoder',
        message0: 'left encoder position',
        output: 'Number',
        style: 'drive_blocks',
        tooltip: 'Get the current position of the left wheel encoder.',
        helpUrl: '',
      });
    },
  };

  // --- Get Right Encoder ---
  Blockly.Blocks['xrp_drive_get_right_encoder'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_get_right_encoder',
        message0: 'right encoder position',
        output: 'Number',
        style: 'drive_blocks',
        tooltip: 'Get the current position of the right wheel encoder.',
        helpUrl: '',
      });
    },
  };

  // --- Reset Encoders ---
  Blockly.Blocks['xrp_drive_reset_encoders'] = {
    init() {
      this.jsonInit({
        type: 'xrp_drive_reset_encoders',
        message0: 'reset drive encoders',
        previousStatement: null,
        nextStatement: null,
        style: 'drive_blocks',
        tooltip: 'Reset both wheel encoder positions to zero.',
        helpUrl: '',
      });
    },
  };
}
