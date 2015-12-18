'use strict';

(function() {

 /**
  * @param {Object} data
  * @constractor
  */

  function Gallery() {
    this.element = document.querySelector('.gallery-overlay');
    this._closeButton = this.element.querySelector('.gallery-overlay-close');
    this._onCloseClick = this._onCloseClick.bind(this);

  }

  Gallery.prototype.show = function() {
    //debugger;
    this.element.classList.remove('invisible');

    this._closeButton.addEventListener('click', this._onCloseClick);
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };
  window.Gallery = Gallery;
})();
