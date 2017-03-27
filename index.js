/**
 * Package: move-into-view
 *
 * Decription: Move element inside of its parent with
 * configurable ratio.
 *
 * License MIT 2017 Svetlana Linuxenko
 */

/**
 * Finds element parent nodes
 *
 * @name parentsOf
 * @function
 * @access private
 * @param {Element} target HTML Element
 * @param {Function} isParent(element)
 * @returns {Element} Parent node
 */
function _parentsOf (target, isParent) {
  var parent = target.parentElement;
  var wrapper = parent;

  function hasParentAttributes (element) {
    var CSS = window.getComputedStyle(element);
    return ['overflow', 'overflowX', 'overflowY']
      .some(function (attr) {
        return CSS[attr] === 'hidden';
      });
  }

  if (typeof isParent !== 'function') {
    isParent = function () { return false; };
  }

  while (1) {
    if (isParent(parent) || hasParentAttributes(parent)) {
      return {
        parent: parent,
        wrapper: wrapper
      };
    }

    wrapper = parent;
    parent = parent.parentElement;

    if (!parent || parent.tagName === 'BODY') {
      return;
    }
  }
}

/**
 * Calculate wrapper's position based on an aspect ratio provided
 *
 * @name _position
 * @function
 * @access private
 * @param {Number} aspectX aspect x (default 0.5)
 * @param {Number} aspectY aspect y (default 0.5)
 * @returns {Object} Coordinates
 */
function _position (aspectX, aspectY) {
  aspectX = (typeof aspectX === 'undefined') ? 0.5 : aspectX;
  aspectY = (typeof aspectY === 'undefined') ? 0.5 : aspectY;

  var parent = this.parent.getBoundingClientRect();
  var wrapper = this.wrapper.getBoundingClientRect();
  var target = this.target.getBoundingClientRect();

  var x = 1 + ~wrapper.left + target.left + (target.width * aspectX) - (parent.width * aspectX);
  var y = 1 + ~wrapper.top + target.top + (target.height * aspectY) - parent.height * aspectY;

  if (x < 0) x = 0;
  if ((wrapper.width - x) < parent.width) x = wrapper.width - parent.width;

  if (y < 0) y = 0;
  if ((wrapper.height - y) < parent.height) y = wrapper.height - parent.height;

  return {
    x: x,
    y: y
  };
}

/**
 * Applying elements position
 *
 * @name _move
 * @function
 * @access private
 * @param {String} dir Direction
 * @param {Number} aspectX
 * @param {Number} aspectY
 */
function _move (dir, aspect) {
  var position = this.position(aspect, aspect);

  if (dir === 'x' || dir === 'both') {
    this.wrapper.style.left = (position.x * -1) + 'px';
  }

  if (dir === 'y' || dir === 'both') {
    this.wrapper.style.top = (position.y * -1) + 'px';
  }

  return this;
}

function MoveIntoView (target, options) {
  target = target || this;
  options = options || {};
  var parents = _parentsOf(target, options.isParent);

  parents.parent.scrollTop = 0;
  parents.parent.scrollLeft = 0;
  parents.wrapper.scrollTop = 0;
  parents.wrapper.scrollLeft = 0;

  var view = {
    target: target,
    wrapper: parents.wrapper,
    parent: parents.parent,
    position: _position,
    move: { }
  };

  view.move.x = _move.bind(view, 'x');
  view.move.y = _move.bind(view, 'y');
  view.move.both = _move.bind(view, 'both');

  return view;
}

module.exports = MoveIntoView;
