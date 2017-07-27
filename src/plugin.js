/**
 * prepend:
 *
 *     import 'source-map-support/register';
 *
 * to files this plugin is used on.
 */

import isMatch from 'lodash.ismatch'

const MODULE = 'source-map-support/register'

/*
 * XXX Babel doesn't currently provide a way to add import statements with no
 * specifiers [1], so we have to work around that by first creating an import
 * statement with a dummy specifier and then removing the specifier. this
 * works as long as we can always distinguish our import statements from import
 * statements supplied by the user.
 *
 * we could do this by passing a dummy identifier to `addImport` and then
 * looking for the exact node it returns in the AST e.g.:
 *
 *     let localIdentifier
 *
 *     Program (path, { file }) {
 *         localIdentifier = file.addImport(
 *             'source-map-support/register',
 *             'dummy'
 *         )
 *     }
 *
 *     ImportDeclaration (path) {
 *         if (path.node.local === localIdentifier) { ... }
 *     }
 *
 * but it's potentially fragile (e.g. if nodes are cloned or replaced), so
 * instead we pass an empty string as the identifier name; this
 * creates an import statement with an empty `imported` identifier e.g.:
 *
 *     import { <empty string> as whatever } from 'source-map-support/register';
 *
 * i.e.:
 *
 *     import { as whatever } from 'source-map-support/register';
 *
 * these nodes can be created by `addImport` but are otherwise invalid (the
 * rendered statements are syntactically invalid and Babylon can't parse them)
 * so they can't conflict with anything created by the user
 *
 * [1] https://github.com/babel/babel/issues/6021
 */

const DUMMY_SPECIFIER = {
    type: 'ImportSpecifier',
    imported: {
        type: 'Identifier',
        name: ''
    }
}

export default function babelPluginSourceMapSupport () {
    return {
        visitor: {
            Program (path, { file }) {
                file.addImport(MODULE, '')
            },

            ImportDeclaration (path) {
                const { source, specifiers } = path.node

                if (
                       (source.value === MODULE)
                    && (specifiers.length === 1)
                    && (isMatch(specifiers[0], DUMMY_SPECIFIER))
                ) {
                    specifiers.length = 0
                }
            }
        }
    }
}
