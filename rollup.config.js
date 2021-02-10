import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import run from '@rollup/plugin-run'
import postcss from 'rollup-plugin-postcss'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import packageJson from 'rollup-plugin-generate-package-json'
import progress from 'rollup-plugin-progress'
import { terser } from 'rollup-plugin-terser'

const dev = process.env.ROLLUP_WATCH === 'true';

export default [
  {
    input: 'server/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      preferConst: true
    },
    external: [
      'bcryptjs',
      'body-parser',
      'dotenv',
      'express',
      'mongoose',
      'jsonwebtoken',
    ],
    plugins: [
      packageJson({
        baseContents: (pkg) => ({
          name: pkg.name,
          scripts: {
            start: "node index.js"
          }
        })
      }),
      dev && run(),
      progress()
    ]
  },
  {
    input: 'client/index.js',
    output: {
      file: 'dist/public/main.js',
      format: 'es'
    },
    plugins: [
      commonjs({
        include: 'node_modules/**'
      }),
      resolve(),
      replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
      babel({
        babelHelpers: 'external',
        exclude: ['**/node_modules/**', '**/deps/phoenix/**'],
        presets: [
          [
            '@babel/preset-react',
            {
              targets: {
                browsers: [
                  'last 2 Chrome versions',
                  'last 2 Firefox versions'
                ]
              },
              useBuiltIns: true,
              modules: false
            }
          ]
        ],
        plugins: [
          '@babel/plugin-external-helpers'
        ],
        babelrc: false
      }),
      !dev && terser(),
      postcss({
        extract: true,
      }),
      htmlTemplate({
        template: `${__dirname}/client/index.html`,
        target: 'index.html'
      }),
      progress()
    ]
  }
]
