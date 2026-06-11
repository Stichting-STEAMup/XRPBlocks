/**
 * XRP Blocks — Servo block definitions
 * Maps to XRPLib Servo API
 */

export function registerServoBlocks() {
  const SERVO_OPTIONS = [
    ['servo 1', '1'],
    ['servo 2', '2'],
  ];

  // --- Set Servo Angle ---
  Blockly.Blocks['xrp_servo_set_angle'] = {
    init() {
      this.jsonInit({
        type: 'xrp_servo_set_angle',
        message0: '%{BKY_XRP_SERVO_SET_ANGLE}',
        args0: [
          { type: 'field_dropdown', name: 'SERVO', options: SERVO_OPTIONS },
          { type: 'input_value', name: 'ANGLE', check: 'Number' },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: 'servo_blocks',
        tooltip: '%{BKY_XRP_SERVO_SET_ANGLE_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Free Servo ---
  Blockly.Blocks['xrp_servo_free'] = {
    init() {
      this.jsonInit({
        type: 'xrp_servo_free',
        message0: '%{BKY_XRP_SERVO_FREE}',
        args0: [
          { type: 'field_dropdown', name: 'SERVO', options: SERVO_OPTIONS },
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'servo_blocks',
        tooltip: '%{BKY_XRP_SERVO_FREE_TOOLTIP}',
        helpUrl: '',
      });
    },
  };
}
