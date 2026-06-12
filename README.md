# XRP Blocks

A browser-based block-programming IDE for the [XRP robot](https://experiencerobotics.org/), designed with a didactic focus for beginners.

Built on [Blockly](https://developers.google.com/blockly), XRP Blocks lets students drag and drop blocks to write real MicroPython programs and run them directly on the robot over USB using the WebSerial API — no installation required.

## Features

- 🧩 **Block-based programming** — Blockly workspace with XRP-specific categories (Drive, Motors, Servo, Sensors, Board) plus standard logic, loops, math, text, variables, and functions
- 🐍 **Live Python preview** — generated MicroPython code updates in real time as blocks are placed
- 🤖 **Direct robot connection** — run programs on the XRP over WebSerial (Chrome / Edge)
- 📖 **Procedural tutorials** — step-by-step lesson system with toolbox filtering and pre-built templates
- 🌐 **Multilingual** — English and Dutch UI, easily extensible
- 💾 **Save / Load** — export and import workspace JSON files

## Getting Started

XRP Blocks runs entirely in the browser — no build step needed.

1. Open `index.html` in Chrome or Edge (WebSerial requires a Chromium-based browser)
2. Click **Connect XRP** to pair with your robot over USB
3. Drag blocks onto the canvas and click **Run** to execute the program

## Lesson System

XRP Blocks includes a procedural tutorial system inspired by MakeCode for micro:bit.

- Click the **📖 Lesson** button in the toolbar and upload any `.json` lesson file
- The lesson panel slides in above the workspace with step-by-step instructions
- Each lesson can restrict the toolbox to a curated set of categories and blocks
- Each lesson can pre-load a partial workspace template for students to build on

**→ See [docs/lessons.md](docs/lessons.md) for the full lesson format specification.**

Example lessons are in [`examples/lessons/`](examples/lessons/):

| File | Language | Difficulty | Topic |
|---|---|---|---|
| [`les-01-hallo-robot.json`](examples/lessons/les-01-hallo-robot.json) | Dutch | ⭐ Beginner | Driving straight |
| [`les-02-vierkant.json`](examples/lessons/les-02-vierkant.json) | Dutch | ⭐⭐ Intermediate | Driving in a square |
| [`les-03-obstakel.json`](examples/lessons/les-03-obstakel.json) | Dutch | ⭐⭐⭐ Advanced | Obstacle avoidance with sensors |


## Browser Support

WebSerial is required to connect to the robot. Use **Chrome 89+** or **Edge 89+**.

The IDE itself (without robot connection) works in any modern browser.

## License

[MIT](LICENSE)
