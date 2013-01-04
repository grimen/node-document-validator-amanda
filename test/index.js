var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

var Validator = require('../lib/'),
    validator = new Validator(),
    schema;

// -----------------------
//  Test
// --------------------

module.exports = {

  'Amanda': {
    'new': {
      '()': function() {
        assert.instanceOf ( validator, require('../lib/') );

        Validator.reset();

        var validator2 = new Validator();

        assert.equal ( validator2.url, null );
        assert.typeOf ( validator2.options, 'object' );
        assert.deepEqual ( validator2.options.custom, undefined );
      },

      '(options)': function() {
        Validator.reset();

        var validator2 = new Validator({custom: {foo: 'bar'}});

        assert.equal ( validator2.url, null );
        assert.typeOf ( validator2.options, 'object' );
        assert.deepEqual ( validator2.options.custom, {foo: 'bar'} );
      }
    },

    '.klass': function() {
      assert.property ( validator, 'klass' );
      assert.equal ( validator.klass, Validator );
    },

    '.defaults': function() {
      assert.property ( Validator, 'defaults' );

      assert.equal ( Validator.defaults.url, null );
      assert.typeOf ( Validator.defaults.options, 'object' );
    },

    '.options': function() {
      assert.property ( Validator, 'options' );
      assert.typeOf ( Validator.options, 'object' );
      assert.deepEqual ( Validator.options, {singleError: false} );
    },

    '.reset()': function() {
      assert.property ( Validator, 'reset' );
      assert.typeOf ( Validator.reset, 'function' );

      Validator.options = {foo: "bar"};
      assert.deepEqual ( Validator.options, {foo: "bar"} );

      Validator.reset();

      assert.equal ( Validator.url, null );
    }
  },

  'Amanda.prototype': {
    '#options': function() {
      assert.property ( validator, 'options' );
      assert.typeOf ( validator.options, 'object' );
    },

    '#engine': function() {
      assert.property ( validator, 'engine' );
      assert.typeOf ( validator.engine, 'object' );
      assert.deepEqual ( validator.engine, require('amanda')('json') );
    },

    '#validate': {
      before: function() {
        schema = {
          title: {
            required: true,
            type: 'string',
            length: 7
          }
        };
      },

      '': function() {
        assert.property ( validator, 'validate' );
        assert.typeOf ( validator.validate, 'function' );
      },

      '(attributes) - when valid data': function(done) {
        var data = {title: "A title"};

        validator.validate(data, schema, function(err, errors, valid) {
          assert.typeOf ( errors, 'null' );
          assert.equal ( valid, true );
          done();
        });
      },

      '(attributes) - when invalid data': function(done) {
        var data = {title: "A"};

        validator.validate(data, schema, function(err, errors, valid) {
          assert.typeOf ( errors, 'object' );
          assert.equal ( errors.length, 1 );
          assert.equal ( valid, false );
          done();
        });
      },

      '(attributes, options) - when valid data': function(done) {
        var data = {title: "A title"};

        validator.validate(data, schema, {}, function(err, errors, valid) {
          assert.typeOf ( errors, 'null' );
          assert.equal ( valid, true );
          done();
        });
      },

      '(attributes, options) - when invalid data': function(done) {
        var data = {title: "A"};

        validator.validate(data, schema, {}, function(err, errors, valid) {
          assert.typeOf ( errors, 'object' );
          assert.equal ( errors.length, 1 );
          assert.equal ( valid, false );
          done();
        });
      }
    }
  }

};
