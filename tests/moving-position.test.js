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
    'width': '90px',
    'height': '120px',
    'overflow': 'hidden'
  },

  '.wrapper': {
    'position': 'absolute'
  },

  '.child': {
    'display': 'block',
    'width': '90px',
    'height': '60px'
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

  it('should move child', function () {
    var wrapper = document.getElementById('wrapper');
    var child = wrapper.childNodes[1];
    MoveIntoView(child).move.y(0.5);
    expect(wrapper.style.top).to.be.equal('-30px');
    MoveIntoView(child).move.y(1);
    expect(wrapper.style.top).to.be.equal('0px');
    MoveIntoView(child).move.y(0);
    expect(wrapper.style.top).to.be.equal('-60px');
  });
});

