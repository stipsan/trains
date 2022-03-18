const { config } = require('@swc/core/spack')

module.exports = config({
  entry: {
    //'@react-three/drei': __dirname + "/workaround/@react-three/drei.js",
    //'@react-three/fiber': __dirname + "/workaround/@react-three/fiber.js",
    codyhack: __dirname + '/workaround/codyhack.js',
  },
  output: {
    path: __dirname + '/compiled',
  },
  module: {},
  // externalModules: ['react', 'react-dom', 'scheduler', 'loose-envify', 'object-assign']
})
