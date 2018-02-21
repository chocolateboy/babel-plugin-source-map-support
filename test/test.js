import test                  from 'ava'
import { transformFileSync } from 'babel-core'
import Fs                    from 'fs'
import glob                  from 'globby'
import Path                  from 'path'
import root                  from 'root-path'

const isDev = process.env.NODE_ENV === 'development'
const pluginPath = root('dist/index.js')
const testDirs = glob.sync(root('test/fixtures/*/'))

for (const testDir of testDirs) {
    const inputPath = Path.resolve(testDir, 'input.js')
    const outputPath = Path.resolve(testDir, 'output.js')
    const testName = Path.basename(testDir)

    test(testName, t => {
        const { code: got } = transformFileSync(inputPath, {
            plugins: [pluginPath],
            babelrc: false,
        })

        if (isDev) {
            console.warn('%s:\n<<%s>>', testName, got)
        }

        const want = Fs.readFileSync(outputPath, 'utf8')

        t.is(got.trim(), want.trim())
    })
}
