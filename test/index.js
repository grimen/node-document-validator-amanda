
var Validator = require('../../node-document-validator');

module.exports = Validator.Spec('Amanda', {
  module: require('..'),
  engine: require('amanda')('json'),
  options: {
    singleError: false
  }
});
