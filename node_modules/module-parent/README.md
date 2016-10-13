[![npm version](https://badge.fury.io/js/module-parent.svg)](http://badge.fury.io/js/module-parent)
[![Build Status](https://travis-ci.org/alykoshin/module-parent.svg)](https://travis-ci.org/alykoshin/module-parent)
[![Coverage Status](https://coveralls.io/repos/alykoshin/module-parent/badge.svg?branch=master&service=github)](https://coveralls.io/github/alykoshin/module-parent?branch=master)
[![Code Climate](https://codeclimate.com/github/alykoshin/module-parent/badges/gpa.svg)](https://codeclimate.com/github/alykoshin/module-parent)
[![Inch CI](https://inch-ci.org/github/alykoshin/module-parent.svg?branch=master)](https://inch-ci.org/github/alykoshin/module-parent)

[![Dependency Status](https://david-dm.org/alykoshin/module-parent/status.svg)](https://david-dm.org/alykoshin/module-parent#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/module-parent/dev-status.svg)](https://david-dm.org/alykoshin/module-parent#info=devDependencies)


# module-parent

Get one of the module&#39;s parents, cleaning the require cache


If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/module-parent/issues).


# Installation

```sh
npm install --save module-parent
```

# Usage

```js
var parentModule = require('module-parent')(module, 0);
var parentName = parentModule && path.basename(parentModule.filename, '.js') || 'app';
```

Caution: this module clears `require.cache` to resolve the filename for the parent modules (if `numParentsToSkip` parameter is set, then `require.cache` is set for all the module when going up to parent, except last parent).
By default, `module.parent` points to the module which `require`d this one at first time, not all the modules `require`'ing it later.
  
That means, each time module loads as at first time and, for example, it's not possible to use singleton pattern for all the modules which uses package `module-parent`.
         
# Parameters

```js
var parentModule = require('module-parent')(
  moduleToStart,      // module to start from
  numParentsToSkip    // number of parents to skip; default: 0
);
```

## moduleToStart
Type: Object
Description: Module to start from. Usually equals to `module`, means to determine parents of current module.
Mandatory
Default: none 
    
## numParentsToSkip
Type: Number
Description: Number of parent module to skip.
For example, if you need to find module.parent.parent, you need to set it to 1 etc.
Optional
Default: 0, means use parent of the module provided as first parameter.

# Examples

Fragment of package [require-dir-all](https://www.npmjs.com/package/require-dir-all):

```
var moduleParent = require('module-parent');
....
options._parentsToSkip = options._parentsToSkip || 0;
...
var originalModule     = moduleParent(module, options._parentsToSkip);
var parentDir          = path.dirname(originalModule.filename);
```

Fragment of package [config-dir-all](https://www.npmjs.com/package/config-dir-all):

```js
var moduleParent   = require('module-parent');
var originalModule = moduleParent(module, 0);
var parentDir      = path.dirname(originalModule.filename);
```

Fragment of package [mini-rest-logger](https://www.npmjs.com/package/mini-rest-logger):

```js
var parent     = require('module-parent')(module, 1);
var parentName = parent && path.basename(parent.filename, '.js') || 'app';
```

# Credits
[Alexander](https://github.com/alykoshin/)


# Links to package pages:

[github.com](https://github.com/alykoshin/module-parent) &nbsp; [npmjs.com](https://www.npmjs.com/package/module-parent) &nbsp; [travis-ci.org](https://travis-ci.org/alykoshin/module-parent) &nbsp; [coveralls.io](https://coveralls.io/github/alykoshin/module-parent) &nbsp; [inch-ci.org](https://inch-ci.org/github/alykoshin/module-parent)


## License

MIT
