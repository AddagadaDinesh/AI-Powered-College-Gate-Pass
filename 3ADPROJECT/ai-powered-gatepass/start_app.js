const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'startup_log.txt');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

function log(msg) {
    const time = new Date().toISOString();
    const message = `[${time}] ${msg}\n`;
    logStream.write(message);
}

log('--- STARTUP ATTEMPT ---');

log('Starting Backend (node server.js)...');
const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    env: { ...process.env, PORT: 5000 }
});

backend.stdout.on('data', (data) => log(`BACKEND STDOUT: ${data.toString().trim()}`));
backend.stderr.on('data', (data) => log(`BACKEND STDERR: ${data.toString().trim()}`));
backend.on('error', (err) => log(`BACKEND SPAWN ERROR: ${err.message}`));
backend.on('close', (code) => log(`BACKEND CLOSED WITH CODE: ${code}`));

log('Starting Frontend (npm start)...');
const frontend = spawn('cmd.exe', ['/c', 'npm start'], {
    cwd: path.join(__dirname, 'frontend')
});

frontend.stdout.on('data', (data) => log(`FRONTEND STDOUT: ${data.toString().trim()}`));
frontend.stderr.on('data', (data) => log(`FRONTEND STDERR: ${data.toString().trim()}`));
frontend.on('error', (err) => log(`FRONTEND SPAWN ERROR: ${err.message}`));
frontend.on('close', (code) => log(`FRONTEND CLOSED WITH CODE: ${code}`));
