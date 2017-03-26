var MoveIntoView = require('../');
var expect = require('chai').expect;
var resetCSS = require('./css/reset');

var CSSTate = require('csstate');
var cst = new CSSTate();

cst.rule(resetCSS);

describe('Test element setup', function () {
  beforeEach(function () {
    cst.rule(resetCSS);
  });

  afterEach(function () {
    cst.exit();
  });

  it('should be to be', function () {
    expect(MoveIntoView).to.be.exists;
  });
});

