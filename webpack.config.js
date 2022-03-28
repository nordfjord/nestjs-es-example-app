module.exports = (config) => {
  const externals = config.externals[0]
  config.externals = [
    (param, callback) => {
      // do not externalize rescript deps
      if (param.request.startsWith('rescript/')) {
        return callback()
      }

      return externals(param, callback)
    },
  ]
  return config
}
