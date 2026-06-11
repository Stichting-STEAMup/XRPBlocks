/**
 * XRP Blocks — Toolbox Definition
 * Category-based toolbox with XRP-specific and standard Blockly categories.
 */

export function getToolboxDefinition() {
  return {
    kind: 'categoryToolbox',
    contents: [
      // ── XRP Categories ──
      {
        kind: 'category',
        name: Blockly.Msg['CAT_EVENTS'] || 'Events',
        categorystyle: 'events_category',
        cssConfig: { icon: 'cat-icon cat-icon-events' },
        contents: [
          { kind: 'block', type: 'xrp_start' }
        ],
      },
      {
        kind: 'category',
        name: Blockly.Msg['CAT_DRIVE'] || 'Drive',
        categorystyle: 'drive_category',
        cssConfig: { icon: 'cat-icon cat-icon-drive' },
        contents: [
          {
            kind: 'block',
            type: 'xrp_drive_straight',
            inputs: {
              DISTANCE: { shadow: { type: 'math_number', fields: { NUM: 20 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_drive_straight_effort',
            inputs: {
              DISTANCE: { shadow: { type: 'math_number', fields: { NUM: 20 } } },
              EFFORT: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_drive_turn',
            inputs: {
              ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_drive_turn_effort',
            inputs: {
              ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } },
              EFFORT: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
            },
          },
          { kind: 'block', type: 'xrp_drive_stop' },
          { kind: 'sep', gap: '24' },
          {
            kind: 'block',
            type: 'xrp_drive_set_effort',
            inputs: {
              LEFT: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } },
              RIGHT: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_drive_set_speed',
            inputs: {
              LEFT: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
              RIGHT: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_drive_arcade',
            inputs: {
              SPEED: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } },
              TURN: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            },
          },
          { kind: 'sep', gap: '24' },
          { kind: 'block', type: 'xrp_drive_get_left_encoder' },
          { kind: 'block', type: 'xrp_drive_get_right_encoder' },
          { kind: 'block', type: 'xrp_drive_reset_encoders' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_MOTORS'] || 'Motors',
        categorystyle: 'motor_category',
        cssConfig: { icon: 'cat-icon cat-icon-motors' },
        contents: [
          {
            kind: 'block',
            type: 'xrp_motor_set_effort',
            inputs: {
              EFFORT: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_motor_set_speed',
            inputs: {
              SPEED: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            },
          },
          { kind: 'block', type: 'xrp_motor_get_position' },
          { kind: 'block', type: 'xrp_motor_get_speed' },
          { kind: 'block', type: 'xrp_motor_reset_encoder' },
          { kind: 'sep', gap: '24' },
          { kind: 'block', type: 'xrp_motor_brake' },
          { kind: 'block', type: 'xrp_motor_coast' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_SERVO'] || 'Servo',
        categorystyle: 'servo_category',
        cssConfig: { icon: 'cat-icon cat-icon-servo' },
        contents: [
          {
            kind: 'block',
            type: 'xrp_servo_set_angle',
            inputs: {
              ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } },
            },
          },
          { kind: 'block', type: 'xrp_servo_free' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_SENSORS'] || 'Sensors',
        categorystyle: 'sensor_category',
        cssConfig: { icon: 'cat-icon cat-icon-sensors' },
        contents: [
          { kind: 'block', type: 'xrp_distance_sensor' },
          { kind: 'sep', gap: '16' },
          { kind: 'block', type: 'xrp_line_get_left' },
          { kind: 'block', type: 'xrp_line_get_right' },
          { kind: 'sep', gap: '16' },
          { kind: 'block', type: 'xrp_imu_get_yaw' },
          { kind: 'block', type: 'xrp_imu_get_pitch' },
          { kind: 'block', type: 'xrp_imu_get_roll' },
          { kind: 'block', type: 'xrp_imu_calibrate' },
          { kind: 'sep', gap: '16' },
          { kind: 'block', type: 'xrp_button_is_pressed' },
          { kind: 'block', type: 'xrp_wait_for_button' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_BOARD'] || 'Board',
        categorystyle: 'board_category',
        cssConfig: { icon: 'cat-icon cat-icon-board' },
        contents: [
          { kind: 'block', type: 'xrp_led_on' },
          { kind: 'block', type: 'xrp_led_off' },
          {
            kind: 'block',
            type: 'xrp_led_blink',
            inputs: {
              COUNT: { shadow: { type: 'math_number', fields: { NUM: 3 } } },
              DELAY: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_rgb_led',
            inputs: {
              RED: { shadow: { type: 'math_number', fields: { NUM: 255 } } },
              GREEN: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              BLUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            },
          },
          { kind: 'sep', gap: '16' },
          {
            kind: 'block',
            type: 'xrp_wait_seconds',
            inputs: {
              SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            },
          },
          {
            kind: 'block',
            type: 'xrp_print',
            inputs: {
              TEXT: { shadow: { type: 'text', fields: { TEXT: 'Hello XRP!' } } },
            },
          },
        ],
      },

      // ── Separator ──
      { kind: 'sep' },

      // ── Standard Blockly Categories ──
      {
        kind: 'category',
        name: Blockly.Msg['CAT_LOGIC'] || 'Logic',
        categorystyle: 'logic_category',
        cssConfig: { icon: 'cat-icon cat-icon-logic' },
        contents: [
          { kind: 'block', type: 'controls_if' },
          {
            kind: 'block',
            type: 'controls_ifelse',
          },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_negate' },
          { kind: 'block', type: 'logic_boolean' },
          { kind: 'block', type: 'logic_null' },
          { kind: 'block', type: 'logic_ternary' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_LOOPS'] || 'Loops',
        categorystyle: 'loop_category',
        cssConfig: { icon: 'cat-icon cat-icon-loops' },
        contents: [
          {
            kind: 'block',
            type: 'controls_repeat_ext',
            inputs: {
              TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
            },
          },
          { kind: 'block', type: 'controls_whileUntil' },
          {
            kind: 'block',
            type: 'controls_for',
            fields: { VAR: 'i' },
            inputs: {
              FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
              TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
              BY: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            },
          },
          { kind: 'block', type: 'controls_forEach' },
          { kind: 'block', type: 'controls_flow_statements' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_MATH'] || 'Math',
        categorystyle: 'math_category',
        cssConfig: { icon: 'cat-icon cat-icon-math' },
        contents: [
          { kind: 'block', type: 'math_number', fields: { NUM: 0 } },
          { kind: 'block', type: 'math_arithmetic' },
          { kind: 'block', type: 'math_single' },
          { kind: 'block', type: 'math_trig' },
          { kind: 'block', type: 'math_constant' },
          { kind: 'block', type: 'math_number_property' },
          { kind: 'block', type: 'math_round' },
          { kind: 'block', type: 'math_modulo' },
          { kind: 'block', type: 'math_constrain' },
          {
            kind: 'block',
            type: 'math_random_int',
            inputs: {
              FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
              TO: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
            },
          },
          { kind: 'block', type: 'math_random_float' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_TEXT'] || 'Text',
        categorystyle: 'text_category',
        cssConfig: { icon: 'cat-icon cat-icon-text' },
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_join' },
          { kind: 'block', type: 'text_append' },
          { kind: 'block', type: 'text_length' },
          { kind: 'block', type: 'text_isEmpty' },
          { kind: 'block', type: 'text_indexOf' },
          { kind: 'block', type: 'text_charAt' },
        ],
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_VARIABLES'] || 'Variables',
        categorystyle: 'variable_category',
        cssConfig: { icon: 'cat-icon cat-icon-variables' },
        custom: 'VARIABLE',
      },

      {
        kind: 'category',
        name: Blockly.Msg['CAT_FUNCTIONS'] || 'Functions',
        categorystyle: 'procedure_category',
        cssConfig: { icon: 'cat-icon cat-icon-functions' },
        custom: 'PROCEDURE',
      },
    ],
  };
}
