'use strict';

(function() {

 /**
  * конструктор для создания обьекта Gallery 
  * @constructor
  */

  function Gallery() {
    this.element = document.querySelector('.gallery-overlay');
    this._closeButton = this.element.querySelector('.gallery-overlay-close');
    this._onCloseClick = this._onCloseClick.bind(this);

  }

  /**
   * показ галереи
   */

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');

    this._closeButton.addEventListener('click', this._onCloseClick);
  };
 
  /**
   * скрытие галереи
   */

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');
    this._closeButton.removeEventListener('click', this._onCloseClick);
  };

 /**
  * обработчик клика по крестику(закрыть галерею)
  * @private
  */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };
  window.Gallery = Gallery;
})();
