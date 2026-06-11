/**
 * XRP Blocks — Python generators for Servo blocks
 */

export function registerServoGenerators(pythonModule) {
  const python = pythonModule.pythonGenerator;
  const Order = pythonModule.Order;

  const SERVO_MAP = {
    '1': 'servo_one',
    '2': 'servo_two',
  };

  function getServoVar(block) {
    const servo = block.getFieldValue('SERVO');
    return SERVO_MAP[servo] || 'servo_one';
  }

  python.forBlock['xrp_servo_set_angle'] = function (block, generator) {
    const servo = getServoVar(block);
    const angle = generator.valueToCode(block, 'ANGLE', Order.NONE) || '90';
    return `${servo}.set_angle(${angle})\n`;
  };

  python.forBlock['xrp_servo_free'] = function (block) {
    const servo = getServoVar(block);
    return `${servo}.free()\n`;
  };
}
