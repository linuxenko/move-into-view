var MoveIntoView = require('../');
var expect = require('chai').expect;
var resetCSS = require('./css/reset');

var CSSTate = require('csstate');
var cst = new CSSTate();

function vMock () {
  var vParent = document.createElement('div');
  vParent.classList.add('scrollable');
  vParent.setAttribute('id', 'scrollable');
  var vChild = document.createElement('div');
  vChild.classList.add('wrapper');
  vChild.setAttribute('id', 'wrapper');
  vParent.appendChild(vChild);

  for (var i = 0; i < 10; i++) {
    var el = document.createElement('div');
    el.classList.add('child');
    vChild.appendChild(el);
  }

  return vParent;
}

var vMockCSS = {
  '.scrollable': {
    'position': 'relative',
    'width': '120px',
    'height': '90px',
    'overflow': 'hidden'
  },

  '.wrapper': {
    'white-space': 'nowrap',
    'position': 'absolute'
  },

  '.child': {
    'display': 'inline-block',
    'width': '60px',
    'height': '86px'
  }
};

describe('Test element setup', function () {
  var vParent = null;

  beforeEach(function () {
    cst.rule(resetCSS);
    cst.rule(vMockCSS);
  });

  afterEach(function () {
    cst.exit();
  });

  before(function () {
    vParent = vMock();
    document.body.appendChild(vParent);
  });

  after(function () {
    document.body.removeChild(vParent);
  });

  it('should setup mockup currectly', function () {
    expect(MoveIntoView).to.be.exists;

    var scrollable = document.getElementById('scrollable');

    expect(scrollable.getBoundingClientRect().height).to.be.equal(90);
    expect(scrollable.getBoundingClientRect().width).to.be.equal(120);

    var wrapper = document.getElementById('wrapper');

    expect(wrapper.getBoundingClientRect().width).to.be.equal(600);
    expect(wrapper.childNodes[1].getBoundingClientRect().left).to.be.equal(60);
  });

  it('should find out parent node', function () {
    var wrapper = document.getElementById('wrapper');
    var firstChild = wrapper.childNodes[0];

    expect(MoveIntoView(firstChild).wrapper).to.be.equal(wrapper);
    expect(MoveIntoView(firstChild).parent).to.be.equal(vParent);
  });

  it('should handle negative x aspect ratios', function () {
    var wrapper = document.getElementById('wrapper');
    var view = MoveIntoView(wrapper.childNodes[0]);

    expect(view.position(0.5).x).to.be.equal(0);
    expect(view.position(0).x).to.be.equal(0);
    expect(view.position(1).x).to.be.equal(0);
  });

  it('should handle x aspect ratios', function () {
    var wrapper = document.getElementById('wrapper');
    var view = MoveIntoView(wrapper.childNodes[1]);

    expect(view.position(0).x).to.be.equal(60);
    expect(view.position(0.5).x).to.be.equal(30);
    expect(view.position(1).x).to.be.equal(0);
  });

  it('should handle over width x aspect ratios', function () {
    var wrapper = document.getElementById('wrapper');
    var view = MoveIntoView(wrapper.childNodes[8]);

    expect(view.position(0).x).to.be.equal(480);
    expect(view.position(0.5).x).to.be.equal(450);
    expect(view.position(1).x).to.be.equal(420);

    view = MoveIntoView(wrapper.childNodes[9]);
    expect(view.position(0).x).to.be.equal(480);
    expect(view.position(0.5).x).to.be.equal(480);
    expect(view.position(1).x).to.be.equal(480);
  });
});

