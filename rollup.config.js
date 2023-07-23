import typescript from 'rollup-plugin-typescript'
import pkg from './package.json' assert { type: 'json', integrity: 'sha384-ABC123' }

export default {
  input: './src/index.ts',
  output: [
    //1. cjs ->commonjs
    //2. esm

    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'es',
      file: pkg.module
    }
  ],
  plugins: [typescript()]
}