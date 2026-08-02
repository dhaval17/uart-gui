const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { UartListener } = require('@dhaval/uart.js');

let mainWindow;
let uart;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true // Security best practice
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Listen for the initialization command from the GUI
ipcMain.on('connect-uart', (event, config) => {
  try {
    // Initialize your module with the GUI inputs
    uart = new UartListener({
      path: config.path,
      baudRate: parseInt(config.baudRate),
      dataBits: parseInt(config.dataBits) || 8,
      parity: config.parity || 'none'
    });

    // Send status back to GUI
    event.reply('uart-status', `Connecting to ${config.path} at ${config.baudRate} baud...`);

    // Start listening
    uart.startListening(
      (data) => {
        // Send incoming data to the GUI
        mainWindow.webContents.send('uart-data', data);
      },
      (error) => {
        // Send errors to the GUI
        mainWindow.webContents.send('uart-error', error.message);
      }
    );
  } catch (err) {
    event.reply('uart-error', `Setup Error: ${err.message}`);
  }
});
