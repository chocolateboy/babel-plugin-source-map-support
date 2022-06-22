import resolve from '@rollup/plugin-node-resolve'

export default {
    input: 'src/index.js',
    plugins: [resolve()],
    external: [/node_modules/],
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
        },
        {
            file: `dist/index.esm.js`,
            format: 'esm',
        }
    ]
}
