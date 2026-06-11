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
        message0: '%{BKY_XRP_DISTANCE_SENSOR}',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_DISTANCE_SENSOR_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Line Follower Left ---
  Blockly.Blocks['xrp_line_get_left'] = {
    init() {
      this.jsonInit({
        type: 'xrp_line_get_left',
        message0: '%{BKY_XRP_LINE_GET_LEFT}',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_LINE_GET_LEFT_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Line Follower Right ---
  Blockly.Blocks['xrp_line_get_right'] = {
    init() {
      this.jsonInit({
        type: 'xrp_line_get_right',
        message0: '%{BKY_XRP_LINE_GET_RIGHT}',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_LINE_GET_RIGHT_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- IMU Heading / Yaw ---
  Blockly.Blocks['xrp_imu_get_yaw'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_get_yaw',
        message0: '%{BKY_XRP_IMU_GET_YAW}',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_IMU_GET_YAW_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- IMU Pitch ---
  Blockly.Blocks['xrp_imu_get_pitch'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_get_pitch',
        message0: '%{BKY_XRP_IMU_GET_PITCH}',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_IMU_GET_PITCH_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- IMU Roll ---
  Blockly.Blocks['xrp_imu_get_roll'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_get_roll',
        message0: '%{BKY_XRP_IMU_GET_ROLL}',
        output: 'Number',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_IMU_GET_ROLL_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- IMU Calibrate ---
  Blockly.Blocks['xrp_imu_calibrate'] = {
    init() {
      this.jsonInit({
        type: 'xrp_imu_calibrate',
        message0: '%{BKY_XRP_IMU_CALIBRATE}',
        previousStatement: null,
        nextStatement: null,
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_IMU_CALIBRATE_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Button Pressed ---
  Blockly.Blocks['xrp_button_is_pressed'] = {
    init() {
      this.jsonInit({
        type: 'xrp_button_is_pressed',
        message0: '%{BKY_XRP_BUTTON_IS_PRESSED}',
        output: 'Boolean',
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_BUTTON_IS_PRESSED_TOOLTIP}',
        helpUrl: '',
      });
    },
  };

  // --- Wait For Button ---
  Blockly.Blocks['xrp_wait_for_button'] = {
    init() {
      this.jsonInit({
        type: 'xrp_wait_for_button',
        message0: '%{BKY_XRP_WAIT_FOR_BUTTON}',
        previousStatement: null,
        nextStatement: null,
        style: 'sensor_blocks',
        tooltip: '%{BKY_XRP_WAIT_FOR_BUTTON_TOOLTIP}',
        helpUrl: '',
      });
    },
  };
}
