import dayjs from 'dayjs'

const spawn = require('cross-spawn')

let gitHash: string
let gitNumCommits: number
try {
  gitHash = spawn
    .sync('git', ['rev-parse', '--short', 'refs/remotes/origin/master'])
    .stdout.toString()
    .trim()
  gitNumCommits = Number(
    spawn.sync('git', ['rev-list', 'refs/remotes/origin/master', '--count']).stdout
  )
} catch {
  gitHash = ''
  gitNumCommits = 0
}

const createBuildInfo = () => {
  return JSON.stringify({
    gitHash,
    gitNumCommits,
    timestamp: dayjs().format('YYYY-MM-DD hh:mm:ss')
  })
}

export default createBuildInfo
