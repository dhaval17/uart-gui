#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const electronPath = require('electron');
const appPath = path.join(__dirname, '..');

// Spawn the electron process
const child = spawn(electronPath, [appPath, '--no-sandbox'], { stdio: 'inherit' });

child.on('close', (code) => {
  process.exit(code);
});
