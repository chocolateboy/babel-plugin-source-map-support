# babel-plugin-source-map-support

[![npm status](http://img.shields.io/npm/v/babel-plugin-source-map-support.svg)](https://www.npmjs.org/package/babel-plugin-source-map-support)
[![build status](https://secure.travis-ci.org/chocolateboy/babel-plugin-source-map-support.svg)](http://travis-ci.org/chocolateboy/babel-plugin-source-map-support)

A babel plugin which automatically enables source-map support for v8 stack traces.

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

Note: this module doesn't install the [source-map-support](https://www.npmjs.com/package/source-map-support)
module. That should be installed separately:

    npm install source-map-support --save

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
