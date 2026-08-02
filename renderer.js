const connectBtn = document.getElementById('connectBtn');
const output = document.getElementById('output');

// Function to log messages to the screen
function logToScreen(prefix, message) {
  output.value += `[${prefix}] ${message}\n`;
  output.scrollTop = output.scrollHeight; // Auto-scroll to bottom
}

// Handle Connect Button Click
connectBtn.addEventListener('click', () => {
  const config = {
    path: document.getElementById('path').value,
    baudRate: document.getElementById('baudRate').value,
    dataBits: document.getElementById('dataBits').value,
    parity: document.getElementById('parity').value
  };

  logToScreen('INFO', 'Attempting connection...');
  window.uartAPI.connect(config);
});

// Listen for incoming data
window.uartAPI.onData((data) => {
  logToScreen('DATA', data);
});

// Listen for status updates
window.uartAPI.onStatus((status) => {
  logToScreen('STATUS', status);
});

// Listen for errors
window.uartAPI.onError((error) => {
  logToScreen('ERROR', error);
});
