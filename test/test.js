import test                  from 'ava'
import { transformFileSync } from 'babel-core'
import Fs                    from 'fs'
import glob                  from 'globby'
import Path                  from 'path'
import root                  from 'root-path'

function dump ({ code }, testName) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('%s:\n<<%s>>', testName, code)
    }

    return code
}

const pluginPath = root('dist/plugin.js')
const testDirs = glob.sync(root('test/fixtures/*'))

for (const testDir of testDirs) {
    const inputPath = Path.resolve(testDir, 'input.js')
    const outputPath = Path.resolve(testDir, 'output.js')
    const testName = Path.basename(testDir)

    test(testName, t => {
        const output = transformFileSync(inputPath, {
            plugins: [pluginPath],
            babelrc: false,
        })

        const got = dump(output, testName)
        const want = Fs.readFileSync(outputPath, 'utf8')

        t.deepEqual(got.trim(), want.trim())
    })
}
