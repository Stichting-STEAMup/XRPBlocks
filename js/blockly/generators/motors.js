/**
 * XRP Blocks — Python generators for Motor blocks
 */

export function registerMotorGenerators(pythonModule) {
  const python = pythonModule.pythonGenerator;
  const Order = pythonModule.Order;

  // Map dropdown values to Python variable names
  const MOTOR_MAP = {
    LEFT: 'left_motor',
    RIGHT: 'right_motor',
    MOTOR3: 'motor_three',
    MOTOR4: 'motor_four',
  };

  function getMotorVar(block) {
    const motor = block.getFieldValue('MOTOR');
    return MOTOR_MAP[motor] || 'left_motor';
  }

  python.forBlock['xrp_motor_set_effort'] = function (block, generator) {
    const motor = getMotorVar(block);
    const effort = generator.valueToCode(block, 'EFFORT', Order.NONE) || '0';
    return `${motor}.set_effort(${effort})\n`;
  };

  python.forBlock['xrp_motor_set_speed'] = function (block, generator) {
    const motor = getMotorVar(block);
    const speed = generator.valueToCode(block, 'SPEED', Order.NONE) || '0';
    return `${motor}.set_speed(${speed})\n`;
  };

  python.forBlock['xrp_motor_get_position'] = function (block) {
    const motor = getMotorVar(block);
    return [`${motor}.get_position()`, Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_motor_get_speed'] = function (block) {
    const motor = getMotorVar(block);
    return [`${motor}.get_speed()`, Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_motor_reset_encoder'] = function (block) {
    const motor = getMotorVar(block);
    return `${motor}.reset_encoder_position()\n`;
  };

  python.forBlock['xrp_motor_brake'] = function (block) {
    const motor = getMotorVar(block);
    return `${motor}.brake()\n`;
  };

  python.forBlock['xrp_motor_coast'] = function (block) {
    const motor = getMotorVar(block);
    return `${motor}.coast()\n`;
  };
}
