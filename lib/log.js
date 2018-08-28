var log4js = require('log4js')

function log(opts) {
  log4js.addLayout('json', function(config) {
    return opts.formatter
  })

  log4js.configure({
    appenders: {
      error: {
        type: 'dateFile',
        layout: { type: 'json' },
        filename: opts.filename,
        pattern: opts.pattern,
        compress: true
      }
    },
    categories: { default: { appenders: ['error'], level: 'error' } },
    pm2: true
  })

  return log4js.getLogger()
}

module.exports = log