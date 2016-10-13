/* globals describe, before, beforeEach, after, afterEach, it */

'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

var path = require('path');


var moduleParent = require('../');

describe('module-parent', function () {

  var parent0 = moduleParent(module, 0);
  var basename0 = path.basename(parent0.filename);

  var parent1 = moduleParent(module, 1);
  var basename1 = path.basename(parent1.filename);

  var parent2 = moduleParent(module, 2);
  var basename2 = path.basename(parent2.filename);

  before('before', function () {
  });


  it('expect(basename0).to.be.equal(\'mocha.js\')s', function () {
    expect(basename0).to.be.equal('mocha.js');
  });

  it('expect(parent0.parent).to.be.deep.equal(parent1)', function () {
    expect(parent0.parent).to.be.deep.equal(parent1);
  });

  it('expect(parent0.children).to.include.something.that.equals(module)', function () {
    expect(parent0.children).to.include.something.that.equals( module );
  });


  it('expect(basename1).to.be.equal(\'index.js\')', function () {
    expect(basename1).to.be.equal('index.js');
  });

  it('expect(parent1.parent).to.be.equal(parent2)', function () {
    expect(parent1.parent).to.be.equal(parent2);
  });

  it('expect(parent1.children).to.include.something.that.equals( parent0 )', function () {
    expect(parent1.children).to.include.something.that.equals( parent0 );
  });


  it('expect(basename2).to.be.equal(\'_mocha\')', function () {
    expect(basename2).to.be.equal('_mocha');
  });

  it('expect(parent2.children).to.include.something.that.equals( parent1 )', function () {
    expect(parent2.children).to.include.something.that.equals( parent1 );
  });

});
//expect(parent.children).to.contain.a.thing.with.property('id', module.filename);
