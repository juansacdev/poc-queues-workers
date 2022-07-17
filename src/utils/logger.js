const { pino } = require('pino')

const Logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      crlf: true,
      translateTime: 'SYS:standard',
      ignore: 'hostname,pid'
    }
  }
})

module.exports = {
  Logger
}
