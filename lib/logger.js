var { merge, dateFormat } = require('./util')
var log = require('./log')
const path = require('path')

function logger(opts) {
  opts = merge({
    filename: './.tmp/application.log',
    pattern: '_yyyy-MM-dd',
    keepFileExt: true,
    daysToKeep: 7,
    formatter: function(logEvent) {
      var time = dateFormat(logEvent.startTime, 'hh:mm:ss.S')
      var level = logEvent.level.levelStr
      var category = logEvent.data[0]
      var data = logEvent.data[1]
      return time + ' ' + level + ' ' + category + ' - ' + data
    }
  }, opts)

  if (opts.appname) {
    opts.filename = path.join(
      process.env.HOME || process.env.USERPROFILE,
      'logs',
      opts.appname,
      'application.log'
    )
  }
  console.log(opts)

  return function(ctx, next) {
    !ctx.logger && (ctx.logger = [])
    ctx.logger.push(log(opts))
    return next()
  }
}


module.exports = logger