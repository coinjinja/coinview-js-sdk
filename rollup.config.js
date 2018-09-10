import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

function getConfig (target) {
  const config = {
    input: 'src/index.js',
  }
  if (target === 'common') {
    config.external = ['uuid/v4']
    config.plugins = [
      babel({exclude: 'node_modules/**'})
    ]
    config.output = {
      file: 'dist/coinview.common.js',
      format: 'cjs',
      sourcemap: true
    }
  } else if (target === 'window') {
    config.plugins = [
      resolve({browser: true}),
      commonjs(),
      babel({exclude: 'node_modules/**'}),
      uglify()
    ]
    config.output = {
      file: 'dist/coinview.min.js',
      name: 'coinview',
      format: 'iife'
    }
  }
  return config
}

export default getConfig(process.env.TARGET)
