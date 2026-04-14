'use strict';

/**
 * Точка входа для Amvera: run.scriptName → `node amvera-server.cjs` (без npm).
 * Тогда при SIGTERM при деплое в логе нет «npm error» от обёртки npm run start.
 */
const { spawn } = require('child_process');
const path = require('path');

const nextCli = path.join(__dirname, 'node_modules/next/dist/bin/next');
const child = spawn(process.execPath, [nextCli, 'start', '-p', '80', '-H', '0.0.0.0'], {
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 0);
});
