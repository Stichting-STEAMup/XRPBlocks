/**
 * XRP Blocks — Sensor block definitions
 * Maps to XRPLib DistanceSensor, Reflectance, IMU, Board APIs
 */

export function registerSensorBlocks() {

  // --- Distance Sensor ---
  Blockly.Blocks['xrp_distance_sensor'] = {
    init() {
      this.jsonInit({
        type: 'xrp_distance_sensor',
        message0: 'distance in cm',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: 'Read the distance sensor (ultrasonic) in centimeters.',
        helpUrl: '',
      });
    },
  };

  // --- Line Follower Left ---
  Blockly.Blocks['xrp_line_get_left'] = {
    init() {
      this.jsonInit({
        type: 'xrp_line_get_left',
        message0: 'left line sensor',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: 'Read the left reflectance sensor (0–1). Higher = lighter surface.',
        helpUrl: '',
      });
    },
  };

  // --- Line Follower Right ---
  Blockly.Blocks['xrp_line_get_right'] = {
    init() {
      this.jsonInit({
        type: 'xrp_line_get_right',
        message0: 'right line sensor',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: 'Read the right reflectance sensor (0–1). Higher = lighter surface.',
        helpUrl: '',
      });
    },
  };

  // --- IMU Heading / Yaw ---
  Blockly.Blocks['xrp_imu_get_yaw'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_get_yaw',
        message0: 'heading (yaw)',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: 'Get the heading angle (yaw) from the IMU in degrees.',
        helpUrl: '',
      });
    },
  };

  // --- IMU Pitch ---
  Blockly.Blocks['xrp_imu_get_pitch'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_get_pitch',
        message0: 'pitch angle',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: 'Get the pitch angle from the IMU in degrees.',
        helpUrl: '',
      });
    },
  };

  // --- IMU Roll ---
  Blockly.Blocks['xrp_imu_get_roll'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_get_roll',
        message0: 'roll angle',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: 'Get the roll angle from the IMU in degrees.',
        helpUrl: '',
      });
    },
  };

  // --- IMU Calibrate ---
  Blockly.Blocks['xrp_imu_calibrate'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_calibrate',
        message0: 'calibrate IMU',
        previousStatement: null,
        nextStatement: null,
        style: 'sensor_blocks',
        tooltip: 'Calibrate the IMU sensor. Keep the robot still during calibration.',
        helpUrl: '',
      });
    },
  };

  // --- Button Pressed ---
  Blockly.Blocks['xrp_button_is_pressed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_button_is_pressed',
        message0: 'button pressed?',
        output: 'Boolean',
        style: 'sensor_blocks',
        tooltip: 'Check if the onboard button is currently pressed.',
        helpUrl: '',
      });
    },
  };

  // --- Wait For Button ---
  Blockly.Blocks['xrp_wait_for_button'] = {
    init() {
      this.jsonInit({
        type: 'xrp_wait_for_button',
        message0: 'wait for button press',
        previousStatement: null,
        nextStatement: null,
        style: 'sensor_blocks',
        tooltip: 'Pause the program until the onboard button is pressed.',
        helpUrl: '',
      });
    },
  };
}
