import html from '@open-wc/rollup-plugin-html'
import resolve from '@rollup/plugin-node-resolve'
export default {
    input: 'src/index.html',
    output: {dir: 'www', format: 'esm'},
    plugins: [resolve(), html()]
}