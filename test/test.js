import test               from 'ava'
import Fs                 from 'fs'
import Path               from 'path'
import Prettier           from 'prettier'
import { promisify }      from 'util'
import { transformAsync } from '@babel/core'

const isDev = process.env.NODE_ENV === 'development'
const fixtures = Path.join(__dirname, 'fixtures')
const pluginPath = Path.resolve(__dirname, '..')

// TODO use fs.promises.readFile when node v8 is EOL
const readFileAsync = promisify(Fs.readFile)

function normalize (html) {
    return Prettier.format(html.trim(), { parser: 'babel' })
}

for (const name of Fs.readdirSync(fixtures)) {
    const inputPath = Path.resolve(fixtures, name, 'input.js')
    const outputPath = Path.resolve(fixtures, name, 'output.js')

    test(name, async t => {
        const input = await readFileAsync(inputPath, 'utf8')

        const { code } = await transformAsync(input, {
            plugins: [pluginPath],
            babelrc: false,
        })

        const got = normalize(code)
        const want = normalize(await readFileAsync(outputPath, 'utf8'))

        if (isDev) {
            console.warn(`\n/******************* ${name} *******************/\n`)
            console.warn(`given:\n\n${input}`)
            console.warn(`\n-------------------------------------------------\n`)
            console.warn(`got:\n\n${got}`)
            console.warn(`\n-------------------------------------------------\n`)
            console.warn(`want:\n\n${want}`)
            console.warn(`\n-------------------------------------------------\n`)
        }

        t.is(got, want)
    })
}
