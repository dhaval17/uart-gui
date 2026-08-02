const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('uartAPI', {
  connect: (config) => ipcRenderer.send('connect-uart', config),
  onData: (callback) => ipcRenderer.on('uart-data', (_event, value) => callback(value)),
  onError: (callback) => ipcRenderer.on('uart-error', (_event, value) => callback(value)),
  onStatus: (callback) => ipcRenderer.on('uart-status', (_event, value) => callback(value))
});
