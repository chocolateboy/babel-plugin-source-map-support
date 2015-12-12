# babel-plugin-source-map-support

[![npm status](http://img.shields.io/npm/v/babel-plugin-source-map-support.svg)](https://www.npmjs.org/package/babel-plugin-source-map-support)
[![build status](https://secure.travis-ci.org/chocolateboy/babel-plugin-source-map-support.svg)](http://travis-ci.org/chocolateboy/babel-plugin-source-map-support)

A Babel plugin which automatically makes stack traces source-map aware

- [INSTALL](#install)
- [SYNOPSIS](#synopsis)
- [DESCRIPTION](#description)
- [SEE ALSO](#see-also)
- [VERSION](#version)
- [AUTHOR](#author)
- [COPYRIGHT AND LICENSE](#copyright-and-license)

## INSTALL

    npm install babel-plugin-source-map-support

## SYNOPSIS

`$ cat test.js`

```javascript

import foo from 'foo';
import bar from 'bar';

test();
```

`$ babel test.js`

```javascript
'use strict';

var foo = require('foo');
var bar = require('bar');

test();
```

`$ babel --plugins source-map-support test.js`

```javascript
'use strict';

require('source-map-support/register');

var foo = require('foo');
var bar = require('bar');

test();
```

## DESCRIPTION

This is a [Babel](https://www.npmjs.com/package/babel) [plugin](https://babeljs.io/docs/advanced/plugins/)
which prepends a statement equivalent to the following to source files:

```javascript
require('source-map-support/register');
```

In conjunction with the [source-map-support](https://www.npmjs.com/package/source-map-support)
module, which must be installed separately, this statement hooks into the v8 stack trace API to
translate call sites in the transpiled code back to their corresponding locations in
the original code.

Note: this only works in environments which support the v8 stack trace API (e.g. Node.js and Chrome),
though it is harmless in other environments.

The source-map-support module only needs to be registered in the top-level file of an application,
but it no-ops if it has already been loaded, so there is no harm in registering it in every file.

### CAVEATS

Source maps must currently be inline. While the source-map-support module provides a way
to associate a file with an external source map, that is not currently supported by
this plugin.

## SEE ALSO

* [babel](https://www.npmjs.com/package/babel)
* [source-map-support](https://www.npmjs.com/package/source-map-support)

## VERSION

0.0.1

## AUTHOR

[chocolateboy](mailto:chocolate@cpan.org)

## COPYRIGHT AND LICENSE

Copyright © 2015 by chocolateboy

This module is free software; you can redistribute it and/or modify it under the
terms of the [Artistic License 2.0](http://www.opensource.org/licenses/artistic-license-2.0.php).
