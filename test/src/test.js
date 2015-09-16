import 'source-map-support/register';
import assert     from 'power-assert';
import * as babel from 'babel-core';
import espurify   from 'espurify';
import root       from 'rootrequire';

function dump ({ code, ast }) {
    console.log(code);
    console.log(require('util').inspect(espurify(ast.program), { depth: null }));
}

let pluginPath = `${root}/target/src/plugin.js`;

describe('plugin', () => {
    it('prepends a require', () => {
        let fixture = `${root}/test/fixtures/actual.js`;
        let output = babel.transformFileSync(fixture, {
            optional: [ 'runtime', 'strict' ],
            plugins: [ pluginPath ],
            blacklist: [ 'es6.modules' ],
        });

        // dump(output);

        let got = espurify(output.ast.program);
        let want = require(`${root}/test/fixtures/expected.json`);

        assert.deepEqual(got, want);
    });
});
