// Runs server and client dev servers together, without extra dependencies.
// Must be started through `npm run dev` (npm sets npm_execpath, so no shell is needed).
import { spawn } from 'node:child_process'

const npmCli = process.env.npm_execpath
if (!npmCli) {
  console.error('Please start the dev servers via `npm run dev` (npm_execpath is missing).')
  process.exit(1)
}

const children = ['server', 'client'].map((dir) =>
  spawn(process.execPath, [npmCli, '--prefix', dir, 'run', 'dev'], {
    stdio: ['ignore', 'inherit', 'inherit'],
  }),
)

let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const c of children) {
    if (c.pid === undefined) continue
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(c.pid), '/T', '/F'], { stdio: 'ignore' })
    } else {
      c.kill('SIGTERM')
    }
  }
  setTimeout(() => process.exit(code), 500)
}

for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => stop(0))
for (const c of children) c.on('exit', (code) => stop(code ?? 0))
