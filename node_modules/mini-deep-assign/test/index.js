/* globals describe, before, beforeEach, after, afterEach, it */

'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var deepCopy = require('../');

describe('mini-deep-assign', function () {

  it('should keep type for top-level properties', function () {
    var source = {
      null: null,
      true: true,
      false: false,
      string: 'string',
      regexp: /.*/,
      data: new Date(),
      undefined: undefined, // property with undefined value may be removed by Node
      emptyObject: {},
      object: { value: 1 },
      emptyArray: [],
      array: [ 1, 2, 3 ],
    };
    var target = {};
    var res = source;
    expect(deepCopy(target, source)).eql(res);
  });

  it('should copy arrays 1', function () {
    var source = {
      a: [ 1, 2, 3 ],
      b: [ [1, 2], 3 ],
    };
    var target = {};
    var res = source;
    expect(deepCopy(target, source)).eql(res);
    //console.log(source);
  });


  it('should copy arrays 2', function () {
    var source = {
      delivery : ['M','W','F']
    };
    var target = {};
    var res = source;
    expect(deepCopy(target, source)).eql(res);
    //console.log(source);
  });


  it('should copy arrays 3', function () {
    var source =
        {
          '_id' : 3,
          'type' : 'food',
          'item' : 'Super Dark Chocolate',
          'classification' : { 'dept' : 'grocery', 'category' : 'chocolate'},
          'vendor' : {
            'primary' : {
              'name' : 'Marsupial Vending Co',
              'address' : 'Wallaby Rd',
              'delivery' : ['M','W','F']
            },
            'secondary':{
              'name' : 'Intl. Chocolatiers',
              'address' : 'Cocoa Plaza',
              'delivery' : ['Sa']
            }
          }
        }
      ;
    var target = {};
    var res = source;
    expect(deepCopy(target, source)).eql(res);
    //console.log(source);
  });


});
