# @dhaval/uart-gui

A simple Electron-based desktop application to visually test and monitor serial connections using the [@dhaval/uart.js](https://www.npmjs.com/package/@dhaval/uart.js) module.

## Features
* **Visual Interface:** Easy-to-use form to configure your serial port connection.
* **Real-time Monitoring:** View incoming UART data in a scrolling text area.
* **Configurable:** Set your specific Port Path, Baud Rate, Data Bits, and Parity.
* **Cross-Platform:** Works on Linux, Windows, and macOS.

---

## Installation

You can install this GUI globally using npm. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

```bash
npm install -g @dhaval/uart-gui

```

---

## Usage

Once installed globally, you can launch the application from anywhere in your terminal by simply typing:

```bash
uart-gui

```

This will open the Electron desktop application.

1. **Port Path:** Enter your hardware path (e.g., `/dev/ttyUSB0` for Linux, `COM3` for Windows).
2. **Baud Rate:** Enter the baud rate for your device (e.g., `9600`, `115200`).
3. **Data Bits & Parity:** Configure as needed for your specific hardware.
4. Click **"Connect & Listen"** and watch the output area for incoming serial data!

---

## Testing Without Hardware (Linux/Ubuntu)

If you don't have physical hardware to test with, you can mock a hardware serial port using `socat` to create a virtual "loopback" cable.

### 1. Install socat

```bash
sudo apt update && sudo apt install socat

```

### 2. Create Virtual Serial Ports

Run the following command to create two linked pseudo-terminals (PTYs):

```bash
socat -d -d pty,raw,echo=0 pty,raw,echo=0

```

*Leave this terminal running!* It will output two paths, something like:

```text
2026/08/01 22:30:00 socat[12345] N PTY is /dev/pts/2
2026/08/01 22:30:00 socat[12345] N PTY is /dev/pts/3

```

### 3. Connect via the GUI

1. Open the `uart-gui` application.
2. In the **Port Path** field, enter the first virtual port (e.g., `/dev/pts/2`).
3. Click **Connect & Listen**.

### 4. Send Mock Data

Open a new terminal window and send data to the *other* virtual port (e.g., `/dev/pts/3`):

```bash
echo "Hello from the virtual hardware!" > /dev/pts/3

```

Look at your GUI window—you will see the data successfully appear in the text area!

---

## Local Development

If you want to clone this repository and modify the GUI:

1. Clone the repository and navigate into the folder.
2. Install dependencies:
```bash
npm install

```


3. Run the app locally (disables the Linux sandbox for easy local testing):
```bash
npm start

```
