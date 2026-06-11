/**
 * XRP Blocks — Motor block definitions
 * Maps to XRPLib EncodedMotor API
 */

export function registerMotorBlocks() {
  const MOTOR_OPTIONS = [
    ['left', 'LEFT'],
    ['right', 'RIGHT'],
    ['motor 3', 'MOTOR3'],
    ['motor 4', 'MOTOR4'],
  ];

  // --- Set Motor Effort ---
  Blockly.Blocks['xrp_motor_set_effort'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_set_effort',
        message0: 'set %1 motor effort to %2',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
          { type: 'input_value', name: 'EFFORT', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: 'Set the effort (power) of a motor (-1 to 1).',
        helpUrl: '',
      });
    },
  };

  // --- Set Motor Speed ---
  Blockly.Blocks['xrp_motor_set_speed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_set_speed',
        message0: 'set %1 motor speed to %2',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
          { type: 'input_value', name: 'SPEED', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: 'Set the target speed of a motor (rotations per second).',
        helpUrl: '',
      });
    },
  };

  // --- Get Motor Position ---
  Blockly.Blocks['xrp_motor_get_position'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_get_position',
        message0: '%1 motor position',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        output: 'Number',
        style: 'motor_blocks',
        tooltip: 'Get the current encoder position of a motor.',
        helpUrl: '',
      });
    },
  };

  // --- Get Motor Speed ---
  Blockly.Blocks['xrp_motor_get_speed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_get_speed',
        message0: '%1 motor speed',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        output: 'Number',
        style: 'motor_blocks',
        tooltip: 'Get the current speed of a motor.',
        helpUrl: '',
      });
    },
  };

  // --- Reset Motor Encoder ---
  Blockly.Blocks['xrp_motor_reset_encoder'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_reset_encoder',
        message0: 'reset %1 motor encoder',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: 'Reset the encoder position of a motor to zero.',
        helpUrl: '',
      });
    },
  };

  // --- Brake Motor ---
  Blockly.Blocks['xrp_motor_brake'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_brake',
        message0: 'brake %1 motor',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: 'Actively brake the motor (hold position).',
        helpUrl: '',
      });
    },
  };

  // --- Coast Motor ---
  Blockly.Blocks['xrp_motor_coast'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_coast',
        message0: 'coast %1 motor',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: 'Let the motor coast freely (no power).',
        helpUrl: '',
      });
    },
  };
}
