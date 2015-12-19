'use strict';

(function() {
/**
 * записывает в прототип дочернего конструктора методы и свойства родительского конструктора
 * @param {Constructor} child
 * @param {Constructor} parent
 */
  function inherit(child, parent) {
    var constructor = function() {};
    constructor .prototype = parent.prototype;
    child.prototype = new constructor();
  }

  window.inherit = inherit;
})();
