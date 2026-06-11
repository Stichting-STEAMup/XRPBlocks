/**
 * XRP Blocks — Python generators for Board blocks
 */

export function registerBoardGenerators(pythonModule) {
  const python = pythonModule.pythonGenerator;
  const Order = pythonModule.Order;

  python.forBlock['xrp_start'] = function () {
    // Must return a truthy string so Blockly traverses to the next connected block
    return '\n';
  };

  python.forBlock['xrp_led_on'] = function () {
    return 'board.led_on()\n';
  };

  python.forBlock['xrp_led_off'] = function () {
    return 'board.led_off()\n';
  };

  python.forBlock['xrp_led_blink'] = function (block, generator) {
    const count = generator.valueToCode(block, 'COUNT', Order.NONE) || '3';
    const delay = generator.valueToCode(block, 'DELAY', Order.NONE) || '0.5';
    return `board.led_blink(${count}, ${delay})\n`;
  };

  python.forBlock['xrp_rgb_led'] = function (block, generator) {
    const red = generator.valueToCode(block, 'RED', Order.NONE) || '0';
    const green = generator.valueToCode(block, 'GREEN', Order.NONE) || '0';
    const blue = generator.valueToCode(block, 'BLUE', Order.NONE) || '0';
    return `board.set_rgb_led(${red}, ${green}, ${blue})\n`;
  };

  python.forBlock['xrp_wait_seconds'] = function (block, generator) {
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1';
    generator.definitions_['import_time'] = 'import time';
    return `time.sleep(${seconds})\n`;
  };

  python.forBlock['xrp_print'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
    return `print(${text})\n`;
  };
}
