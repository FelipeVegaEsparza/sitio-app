const { spawn } = require('child_process');
const path = require('path');

const entryPoint = path.join(__dirname, 'dist', 'server', 'entry.mjs');
const serverProcess = spawn('node', [entryPoint], { stdio: 'inherit' });

console.log(`Starting Astro server with: node ${entryPoint}`);

const shutdown = () => {
  console.log('Received shutdown signal. Terminating Astro server...');
  serverProcess.kill('SIGTERM'); // Send SIGTERM to the Astro server process
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

serverProcess.on('exit', (code, signal) => {
  console.log(`Astro server process exited with code ${code} and signal ${signal}`);
  process.exit(code);
});

serverProcess.on('error', (err) => {
  console.error('Failed to start Astro server process:', err);
  process.exit(1);
});
