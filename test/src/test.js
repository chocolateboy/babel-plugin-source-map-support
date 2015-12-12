import 'source-map-support/register'
import assert                from 'power-assert'
import espurify              from 'espurify'
import Path                  from 'path'
import { transformFileSync } from 'babel-core'

// XXX rootrequire (amongst others) doesn't work with nom
const root = Path.resolve(__dirname, '../../..')

function dump ({ code, ast }) {
    console.log(code)
    console.log(JSON.stringify(espurify(ast.program), null, 4))
}

let pluginPath = `${root}/target/src/plugin.js`

describe('plugin', () => {
    it('prepends a require', () => {
        let fixture = `${root}/test/fixtures/actual.js`

        let output = transformFileSync(fixture, {
            blacklist: [ 'es6.modules', 'strict' ],
            plugins: [ pluginPath ]
        })

        // dump(output)

        let got = espurify(output.ast.program)
        let want = require(`${root}/test/fixtures/expected.json`)

        assert.deepEqual(got, want)
    })
})
