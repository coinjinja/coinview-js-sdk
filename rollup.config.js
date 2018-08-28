import babel from 'rollup-plugin-babel'

function getConfig (target) {
  const config = {
    input: 'src/index.js',
    plugins: [
      babel({exclude: 'node_modules/**'})
    ]
  }
  if (target === 'common') {
    config.output = {
      file: 'dist/coinview.common.js',
      format: 'cjs'
    }
  } else if (target === 'window') {
    config.output = {
      file: 'dist/coinview.js',
      name: 'coinview',
      format: 'iife'
    }
  }
  return config
}

export default getConfig(process.env.TARGET)
