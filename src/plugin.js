/**
 * add `import { install as _sourceMapSupport } from 'source-map-support';`
 * then call `_sourceMapSupport();`
 *
 * it equivalents to call `require('source-map-support/register');`,
 * but babel 6 `addImport` doesn't support it.
 *
 * @param t
 * @returns {{visitor: {Program: (function(*, *))}}}
 */

export default ({types: t}) => {

    return {
        visitor: {
            Program (path, {file}) {
                let id;

                id = file.addImport(
                    'source-map-support',
                    'install',
                    '_sourceMapSupport'
                );

                path.traverse({
                    ImportDeclaration(path) {

                        if (path.node.source.value === 'source-map-support') {
                            path.insertAfter(t.ExpressionStatement(t.CallExpression(t.identifier('_sourceMapSupport'), [])));
                        }
                    }
                });
            }
        }
    };
};
