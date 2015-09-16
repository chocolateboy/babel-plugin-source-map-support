import 'source-map-support/register';

/*
 * return the AST for this statement:
 *
 *     _sourceMapSupportRegister.install({ handleUncaughtException: true })
 */
function handleUncaughtExceptionNode(t, id) {
    return t.expressionStatement(
        t.callExpression(
            t.memberExpression(
                id,
                t.identifier('install')
            ), [
                t.objectExpression([
                    t.property(
                        'init',
                        t.identifier('handleUncaughtException'),
                        t.literal(true)
                    )
                ])
            ]
        )
    );
}

export default function ({ Plugin, types: t }) {
    return new Plugin('source-map-support', {
        visitor: {
            Program (node, parent, scope, file) {
                let id = file.addImport(
                    'source-map-support/register',
                    null,
                    'absolute'
                );

                // TODO when babel adds support for plugin options
                // https://github.com/babel/babel/issues/1833
                //
                // let ast = handleUncaughtExceptionNode(t, id);
                // this.unshiftContainer('body', ast);
            }
        }
    });
}
