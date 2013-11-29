# NODE-DOCUMENT-VALIDATOR-AMANDA [![Build Status](https://secure.travis-ci.org/grimen/node-document-validator-amanda.png)](http://travis-ci.org/grimen/node-document-validator-amanda)

**Validator** adapter [schema](https://github.com/Baggz/Amanda) for [node-document](https://github.com/grimen/node-document) ODM for Node.js.


## Installation

```shell
  $ npm install node-document-validator-amanda
```


## Usage

**Basic:**

```javascript
  var Validator = require('node-document-validator-amanda');

  var validator = new Validator();

  var data = {
    foo: "foo",
    bar: 123,
    baz: undefined
  };

  var schema = {
    foo: {
      type: "string",
      minLength: 4
    },
    bar: {
      type: "number"
    },
    baz: {
      required: true
    }
  };

  validator.validate(data, schema, function(err, errors, valid) {
    console.log("Valid: %s  \nErrors:\n", valid, errors);
  });
```

For details; see [node-document](https://github.com/grimen/node-document).


## Test

**Local tests:**

```shell
  $ make test
```


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/grimen/node-document-validator-amanda/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
