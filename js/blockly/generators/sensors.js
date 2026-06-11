/**
 * XRP Blocks — Python generators for Sensor blocks
 */

export function registerSensorGenerators(pythonModule) {
  const python = pythonModule.pythonGenerator;
  const Order = pythonModule.Order;

  python.forBlock['xrp_distance_sensor'] = function () {
    return ['rangefinder.distance()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_line_get_left'] = function () {
    return ['reflectance.get_left()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_line_get_right'] = function () {
    return ['reflectance.get_right()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_imu_get_yaw'] = function () {
    return ['imu.get_yaw()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_imu_get_pitch'] = function () {
    return ['imu.get_pitch()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_imu_get_roll'] = function () {
    return ['imu.get_roll()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_imu_calibrate'] = function () {
    return 'imu.calibrate()\n';
  };

  python.forBlock['xrp_button_is_pressed'] = function () {
    return ['board.is_button_pressed()', Order.FUNCTION_CALL];
  };

  python.forBlock['xrp_wait_for_button'] = function () {
    return 'board.wait_for_button()\n';
  };
}
