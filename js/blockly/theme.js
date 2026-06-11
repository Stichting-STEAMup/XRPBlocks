/**
 * XRP Blocks — Custom Blockly Theme (Pastel, child-friendly)
 * Uses the Zelos renderer for Scratch 3.0 block shapes.
 */

export function createXRPTheme() {
  // Block style definitions — pastel colors
  const blockStyles = {
    // XRP-specific categories
    events_blocks: {
      colourPrimary: '#FFCA28',
      colourSecondary: '#FFE082',
      colourTertiary: '#FFB300',
      hat: 'cap',
    },
    drive_blocks: {
      colourPrimary: '#7CB9F0',
      colourSecondary: '#A8D4F7',
      colourTertiary: '#5A9FDE',
      hat: '',
    },
    motor_blocks: {
      colourPrimary: '#B39DDB',
      colourSecondary: '#D1C4E9',
      colourTertiary: '#9575CD',
      hat: '',
    },
    servo_blocks: {
      colourPrimary: '#FFB74D',
      colourSecondary: '#FFCC80',
      colourTertiary: '#FFA726',
      hat: '',
    },
    sensor_blocks: {
      colourPrimary: '#81C784',
      colourSecondary: '#A5D6A7',
      colourTertiary: '#66BB6A',
      hat: '',
    },
    board_blocks: {
      colourPrimary: '#FFD54F',
      colourSecondary: '#FFE082',
      colourTertiary: '#FFCA28',
      hat: '',
    },

    // Standard Blockly categories — pastel overrides
    logic_blocks: {
      colourPrimary: '#82B1FF',
      colourSecondary: '#B3D4FF',
      colourTertiary: '#5C8BCC',
      hat: '',
    },
    loop_blocks: {
      colourPrimary: '#80CBC4',
      colourSecondary: '#B2DFDB',
      colourTertiary: '#5BACA4',
      hat: '',
    },
    math_blocks: {
      colourPrimary: '#EF9A9A',
      colourSecondary: '#F5C6C6',
      colourTertiary: '#D47C7C',
      hat: '',
    },
    text_blocks: {
      colourPrimary: '#CE93D8',
      colourSecondary: '#E1BEE7',
      colourTertiary: '#AB47BC',
      hat: '',
    },
    list_blocks: {
      colourPrimary: '#90CAF9',
      colourSecondary: '#BBDEFB',
      colourTertiary: '#64B5F6',
      hat: '',
    },
    variable_blocks: {
      colourPrimary: '#FFAB91',
      colourSecondary: '#FFCCBC',
      colourTertiary: '#FF8A65',
      hat: '',
    },
    procedure_blocks: {
      colourPrimary: '#A5D6A7',
      colourSecondary: '#C8E6C9',
      colourTertiary: '#81C784',
      hat: '',
    },
    colour_blocks: {
      colourPrimary: '#F48FB1',
      colourSecondary: '#F8BBD0',
      colourTertiary: '#EC407A',
      hat: '',
    },
  };

  // Category style definitions (toolbox sidebar color indicators)
  const categoryStyles = {
    events_category: { colour: '#FFCA28' },
    drive_category: { colour: '#7CB9F0' },
    motor_category: { colour: '#B39DDB' },
    servo_category: { colour: '#FFB74D' },
    sensor_category: { colour: '#81C784' },
    board_category: { colour: '#FFD54F' },
    logic_category: { colour: '#82B1FF' },
    loop_category: { colour: '#80CBC4' },
    math_category: { colour: '#EF9A9A' },
    text_category: { colour: '#CE93D8' },
    list_category: { colour: '#90CAF9' },
    variable_category: { colour: '#FFAB91' },
    procedure_category: { colour: '#A5D6A7' },
    colour_category: { colour: '#F48FB1' },
  };

  // Component styles — workspace chrome
  const componentStyles = {
    workspaceBackgroundColour: '#F8F9FC',
    toolboxBackgroundColour: '#FFFFFF',
    toolboxForegroundColour: '#2D3142',
    flyoutBackgroundColour: '#F0F2F8',
    flyoutForegroundColour: '#2D3142',
    flyoutOpacity: 0.97,
    scrollbarColour: '#D1D5E0',
    scrollbarOpacity: 0.6,
    insertionMarkerColour: '#6C63FF',
    insertionMarkerOpacity: 0.4,
    markerColour: '#6C63FF',
    cursorColour: '#6C63FF',
    selectedGlowColour: '#6C63FF',
    selectedGlowOpacity: 0.2,
    replacementGlowColour: '#6C63FF',
    replacementGlowOpacity: 0.2,
  };

  // Font style
  const fontStyle = {
    family: "'Nunito', 'Segoe UI', system-ui, sans-serif",
    weight: '700',
    size: 12,
  };

  // Start blocks get a hat (cap) shape
  const startHat = true;

  return Blockly.Theme.defineTheme('xrp_pastel', {
    name: 'xrp_pastel',
    blockStyles,
    categoryStyles,
    componentStyles,
    fontStyle,
    startHats: startHat,
  });
}
