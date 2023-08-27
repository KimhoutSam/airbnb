const { iocTransformer } = require('@adonisjs/ioc-transformer')
const ts = require('typescript')
const path = require('node:path')

module.exports = function IocTransformer() {
  return {
    after: iocTransformer(ts, {
      aliases: {},
    }),
  }
}
