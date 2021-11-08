// rollup.config.js

import commonjs from '@rollup/plugin-commonjs';
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import { resolve } from "path";
const configFile = resolve(__dirname, ".babelrc.json");

export default [
  // js 번들링
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        configFile
      })
    ],
    output: [
      { 
        file: 'dist/slowingDownRotation.js', 
        format: 'iife' ,
        name: "SlowingDownRotation",
      },
      { 
        file: 'dist/slowingDownRotation.min.js', 
        format: 'iife',
        name: "SlowingDownRotation",
        plugins: [terser()], 
        sourcemap: true,
      }
    ],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    output: [
      { 
        file: 'dist/slowingDownRotation.esm.js', 
        format: 'esm' ,
      },
      { 
        file: 'dist/slowingDownRotation.esm.min.js', 
        format: 'esm',
        plugins: [terser()], 
        sourcemap: true,
      }
    ],
  },
  {
    // 번들링 기준 파일
    input: 'lib/slowingDownRotation.js',
    plugins: [
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        configFile
      })
    ],
    output: [
      { 
        file: 'dist/slowingDownRotation.umd.js', 
        format: 'umd',
        name: "SlowingDownRotation",
      },
      { 
        file: 'dist/slowingDownRotation.umd.min.js', 
        format: 'umd',
        plugins: [terser()],
        name: "SlowingDownRotation",
        sourcemap: true,
      },
    ],
  },
];