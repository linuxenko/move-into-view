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

function MoveIntoView (target, options) {
  options = options || {};

  var parents = _parentsOf(target, options.isParent);

  var view = {
    wrapper: parents.wrapper,
    parent: parents.parent
  };

  return view;
}

module.exports = MoveIntoView;
