var MoveIntoView = require('./');

/**
 * Shim of the Element.moveIntoView, such as scrollIntoView
 *
 * @name moveIntoView
 * @function
 * @access public
 * @param {Object} options Aspect ratios for any of dimensions x or y or both { x: 0, y: 0.9 }
 */
window.Element.prototype.moveIntoView = function (options) {
  options = options || {};

  var view = MoveIntoView(this);

  if ('x' in options) {
    view.move.x(options.x);
  } else if ('y' in options) {
    view.move.y(options.y);
  } else {
    view.move.both();
  }
};
