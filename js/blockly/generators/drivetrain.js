/**
 * XRP Blocks — Python generators for Drivetrain blocks
 */

export function registerDrivetrainGenerators(pythonModule) {
  const python = pythonModule.pythonGenerator;
  const Order = pythonModule.Order;

  python.forBlock['xrp_drive_straight'] = function (block, generator) {
    const distance = generator.valueToCode(block, 'DISTANCE', Order.NONE) || '0';
    return `drivetrain.straight(${distance})\n`;
  };

  python.forBlock['xrp_drive_straight_effort'] = function (block, generator) {
    const distance = generator.valueToCode(block, 'DISTANCE', Order.NONE) || '0';
    const effort = generator.valueToCode(block, 'EFFORT', Order.NONE) || '50';
    return `drivetrain.straight(${distance}, max_effort=${effort} / 100)\n`;
  };

  python.forBlock['xrp_drive_turn'] = function (block, generator) {
    const angle = generator.valueToCode(block, 'ANGLE', Order.NONE) || '0';
    return `drivetrain.turn(${angle})\n`;
  };

  python.forBlock['xrp_drive_turn_effort'] = function (block, generator) {
    const angle = generator.valueToCode(block, 'ANGLE', Order.NONE) || '0';
    const effort = generator.valueToCode(block, 'EFFORT', Order.NONE) || '50';
    return `drivetrain.turn(${angle}, max_effort=${effort} / 100)\n`;
  };

  python.forBlock['xrp_drive_stop'] = function () {
    return 'drivetrain.stop()\n';
  };

  python.forBlock['xrp_drive_set_effort'] = function (block, generator) {
    const left = generator.valueToCode(block, 'LEFT', Order.NONE) || '0';
    const right = generator.valueToCode(block, 'RIGHT', Order.NONE) || '0';
    return `drivetrain.set_effort(${left}, ${right})\n`;
  };

  python.forBlock['xrp_drive_set_speed'] = function (block, generator) {
    const left = generator.valueToCode(block, 'LEFT', Order.NONE) || '0';
    const right = generator.valueToCode(block, 'RIGHT', Order.NONE) || '0';
    return `drivetrain.set_speed(${left}, ${right})\n`;
  };

  python.forBlock['xrp_drive_arcade'] = function (block, generator) {
    const speed = generator.valueToCode(block, 'SPEED', Order.NONE) || '0';
    const turn = generator.valueToCode(block, 'TURN', Order.NONE) || '0';
    return `drivetrain.arcade(${speed}, ${turn})\n`;
  };

  python.forBlock['xrp_drive_get_left_encoder'] = function () {
    return ['drivetrain.get_left_encoder_position()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_drive_get_right_encoder'] = function () {
    return ['drivetrain.get_right_encoder_position()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_drive_reset_encoders'] = function () {
    return 'drivetrain.reset_encoder_position()\n';
  };
}
