import chalk from 'chalk'

const Log = (...rest) => console.log(`${chalk.blue('[openAPI]')}: ${rest.join('\n')}`)

export default Log
