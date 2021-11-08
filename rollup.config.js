// rollup.config.js

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  babelHelpers: 'runtime',
  plugins: [['@babel/plugin-transform-runtime', { exclude: "node_modules/**", regenerator: false, useESModules }]],
})

export default [
  // js 번들링
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    // 번들링 결과 파일과 형식(esm -> es modules, cjs -> commonjs)
    output: [{ file: 'dist/slowingDownRotation.js', format: 'cjs' }],
    external: '.js',
    plugins: [resolve(), babel(getBabelOptions({ useESModules: false }))],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    // 번들링 결과 파일과 형식(esm -> es modules, cjs -> commonjs)
    output: [{ file: 'dist/slowingDownRotation.min.js', format: 'cjs' }],
    external: '.js',
    plugins: [resolve(), babel(getBabelOptions({ useESModules: false })), uglify(),],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    // 번들링 결과 파일과 형식(esm -> es modules, cjs -> commonjs)
    output: [{ file: 'dist/slowingDownRotation.esm.js', format: 'esm' }],
    external: '.js',
    plugins: [resolve(), babel(getBabelOptions({ useESModules: true }))],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    // 번들링 결과 파일과 형식(esm -> es modules, cjs -> commonjs)
    output: [{ file: 'dist/slowingDownRotation.esm.min.js', format: 'esm' }],
    external: '.js',
    plugins: [resolve(), babel(getBabelOptions({ useESModules: true })), uglify(),],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    // 번들링 결과 파일과 형식(esm -> es modules, cjs -> commonjs)
    output: [{ file: 'dist/slowingDownRotation.umd.js', name: 'bundle', format: 'umd' }],
    external: '.js',
    plugins: [commonjs(), resolve(), babel(getBabelOptions({ useESModules: false }))],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    // 번들링 결과 파일과 형식(esm -> es modules, cjs -> commonjs)
    output: [{ file: 'dist/slowingDownRotation.umd.min.js', name: 'bundle', format: 'umd' }],
    external: '.js',
    plugins: [commonjs(), resolve(), babel(getBabelOptions({ useESModules: false })), uglify(),],
  },
];