/**
 * XRP Blocks — Motor block definitions
 * Maps to XRPLib EncodedMotor API
 */

export function registerMotorBlocks() {
  const MOTOR_OPTIONS = [
    ['%{BKY_XRP_LEFT}', 'LEFT'],
    ['%{BKY_XRP_RIGHT}', 'RIGHT'],
    ['motor 3', 'MOTOR3'],
    ['motor 4', 'MOTOR4'],
  ];

  // --- Set Motor Effort ---
  Blockly.Blocks['xrp_motor_set_effort'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_set_effort',
        message0: '%{BKY_XRP_MOTOR_SET_EFFORT}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
          { type: 'input_value', name: 'EFFORT', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_SET_EFFORT_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Set Motor Speed ---
  Blockly.Blocks['xrp_motor_set_speed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_set_speed',
        message0: '%{BKY_XRP_MOTOR_SET_SPEED}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
          { type: 'input_value', name: 'SPEED', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_SET_SPEED_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Get Motor Position ---
  Blockly.Blocks['xrp_motor_get_position'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_get_position',
        message0: '%{BKY_XRP_MOTOR_GET_POSITION}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        output: 'Number',
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_GET_POSITION_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Get Motor Speed ---
  Blockly.Blocks['xrp_motor_get_speed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_get_speed',
        message0: '%{BKY_XRP_MOTOR_GET_SPEED}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        output: 'Number',
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_GET_SPEED_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Reset Motor Encoder ---
  Blockly.Blocks['xrp_motor_reset_encoder'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_reset_encoder',
        message0: '%{BKY_XRP_MOTOR_RESET_ENCODER}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_RESET_ENCODER_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Brake Motor ---
  Blockly.Blocks['xrp_motor_brake'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_brake',
        message0: '%{BKY_XRP_MOTOR_BRAKE}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_BRAKE_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Coast Motor ---
  Blockly.Blocks['xrp_motor_coast'] = {
    init() {
      this.jsonInit({
        type: 'xrp_motor_coast',
        message0: '%{BKY_XRP_MOTOR_COAST}',
        args0: [
          { type: 'field_dropdown', name: 'MOTOR', options: MOTOR_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'motor_blocks',
        tooltip: '%{BKY_XRP_MOTOR_COAST_TOOLTIP}',
        helpUrl: '',
      });
    },
  };
}
