# babel-plugin-source-map-support

[![npm status](http://img.shields.io/npm/v/babel-plugin-source-map-support.svg)](https://www.npmjs.org/package/babel-plugin-source-map-support)
[![build status](https://secure.travis-ci.org/chocolateboy/babel-plugin-source-map-support.svg)](http://travis-ci.org/chocolateboy/babel-plugin-source-map-support)

- [INSTALL](#install)
- [SYNOPSIS](#synopsis)
- [DESCRIPTION](#description)
  - [CAVEATS](#caveats)
- [DEVELOPMENT](#development)
- [SEE ALSO](#see-also)
- [VERSION](#version)
- [AUTHOR](#author)
- [COPYRIGHT AND LICENSE](#copyright-and-license)

A Babel plugin which automatically makes stack traces source-map aware

# INSTALL

    $ npm install source-map-support --save
    $ npm install babel-plugin-source-map-support --save-dev

# SYNOPSIS

`$ cat test.js`

```javascript
import foo from 'foo';
import bar from 'bar';

foo(bar);
```

`$ babel --plugins source-map-support test.js`

```javascript
import 'source-map-support/register';
import foo from 'foo';
import bar from 'bar';

foo(bar);
```

# DESCRIPTION

This is a [Babel](https://www.npmjs.com/package/babel) [plugin](https://babeljs.io/docs/advanced/plugins/)
which prepends the following statement to source files:

```javascript
import 'source-map-support/register';
```

In conjunction with the [source-map-support](https://www.npmjs.com/package/source-map-support)
module, **which must be installed separately**, this statement hooks into the v8 stack-trace API to
translate call sites in the transpiled code back to their corresponding locations in
the original code.

Note: this only works in environments which support the v8 stack-trace API (e.g. Node.js and Chrome),
though it's harmless in other environments.

The source-map-support module only needs to be registered in the top-level file(s) of an application,
but it no-ops if it has already been loaded, so there is no harm in registering it in every file.

You probably don't want to use this plugin when compiling code for the web because you probably don't
want to include inline source maps in minified code. An easy way to limit the plugin's scope to
development/test builds is to use Babel's [`env` option](https://babeljs.io/docs/usage/babelrc/#env-option) e.g.:

```javascript
{
    env: {
        development: {
            sourceMaps: 'inline',
            plugins: ['source-map-support', ...]
        }
    },

    presets: [ ... ]
}
```

## CAVEATS

Source maps must currently be inline. While the source-map-support module provides a way
to associate a file with an external source map, that is not currently supported by
this plugin.

# DEVELOPMENT

<details>

## NPM Scripts


The following NPM scripts are available:

* test - lint the codebase, compile the plugin, and run the test suite
* test:debug - run the `test` script in debug mode, which dumps each transformed test case

## Gulp Tasks

The following Gulp tasks are available:

* build - compile the plugin and save it to the target directory
* clean - remove the target directory and its contents
* default - run the `build` task
* dump:config - print the build config settings to the console
* lint - check and report style and usage errors in the gulpfile, source file(s) and test file(s)

</details>

# SEE ALSO

* [babel](https://www.npmjs.com/package/babel)
* [source-map-support](https://www.npmjs.com/package/source-map-support)

# VERSION

2.0.1

# AUTHOR

[chocolateboy](mailto:chocolate@cpan.org)

# COPYRIGHT AND LICENSE

Copyright © 2015-2018 by chocolateboy

This module is free software; you can redistribute it and/or modify it under the
terms of the [Artistic License 2.0](http://www.opensource.org/licenses/artistic-license-2.0.php).
