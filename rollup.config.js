import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';

import fs from 'fs'
import path from 'path'

const baseFolder = './src/'
const componentsFolder = 'components/'

const components = fs
    .readdirSync(baseFolder + componentsFolder)
    .filter((f) =>
        fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory()
    )

const entries = {
    'index': './src/index.js',
    'helpers': './src/utils/helpers.js',
    ...components.reduce((obj, name) => {
        obj[name] = (baseFolder + componentsFolder + name)
        return obj
    }, {})
}

const babelConfig = {
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }]]
}

const vuePluginConfig = {
    template: {
        isProduction: true,
        compilerOptions: {
            whitespace: 'condense'
        }
    }
}

export default () => {
    let config = [
        {
            input: entries,
            external: ['vue'],
            output: {
                format: 'esm',
                dir: `dist/esm`
            },
            plugins: [
                nodeResolve({
                    extensions: ['.vue', '.js']
                }),
                vue(vuePluginConfig),
                postcss(),
                babel(babelConfig),
                commonjs()
            ]
        },
        {
            input: entries,
            external: ['vue'],
            output: {
                format: 'cjs',
                dir: 'dist/cjs',
                exports: 'named'
            },
            plugins: [
                nodeResolve({
                    extensions: ['.vue', '.js']
                }),
                vue(vuePluginConfig),
                postcss(),
                babel(babelConfig),
                commonjs()
            ]
        }
    ]

    return config
}
