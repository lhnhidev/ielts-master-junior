// Runs server and client dev servers together, without extra dependencies.
import { spawn } from 'node:child_process'

const children = ['server', 'client'].map((dir) =>
  spawn(`npm --prefix ${dir} run dev`, { stdio: ['ignore', 'inherit', 'inherit'], shell: true }),
)

let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const c of children) {
    if (c.pid === undefined) continue
    if (process.platform === 'win32') {
      spawn(`taskkill /pid ${c.pid} /T /F`, { shell: true, stdio: 'ignore' })
    } else {
      c.kill('SIGTERM')
    }
  }
  setTimeout(() => process.exit(code), 500)
}

for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => stop(0))
for (const c of children) c.on('exit', (code) => stop(code ?? 0))
