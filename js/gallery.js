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
    this._onPhotoClick = this._onPhotoClick.bind(this);
    this._overlay = document.querySelector('.gallery-overlay');
    this._likes = this._overlay.querySelector('.likes-count');
    this._comments = this._overlay.querySelector('.comments-count');
    this._onHashChange = this._onHashChange.bind(this);

    window.addEventListener('hashchange', this._onHashChange);

    this._currentSlide = 0;
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
    this._overlay.querySelector('.gallery-overlay-image').removeEventListener('click', this._onPhotoClick);
    location.hash = '';
  };

 /**
  * обработчик клика по крестику(закрыть галерею)
  * @private
  */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

 /**
  * @param {Array,<Object>}
  * принимает на вход массив фотографий и сохраняет его в объекте.
  */
  Gallery.prototype.setPictures = function(pictures) {
    this._data = pictures;
  };

  Gallery.prototype.setCurrentPicture = function(index) {
    if (typeof index == 'number') {
      this._setCurrentPicture(index);
    };
    if (typeof index == 'string') {  
      for(var i = 0; i < this._data.length; i++) {
        var pictureItem = this._data[i];
        if (pictureItem.url == index) {
          this._setCurrentPicture(i);
        }
      };
    };
  };

  Gallery.prototype._setCurrentPicture = function(index) {
    this._currentSlide = index;
    var picture = this._data[index];
    var image = this._overlay.querySelector('.gallery-overlay-image');
    image.src = picture.url;
    image.addEventListener('click', this._onPhotoClick);
    this._likes.textContent = picture.likes;
    this._comments.textContent = picture.comments;
  };

  Gallery.prototype._onPhotoClick = function() {
    if (this._currentSlide < this._data.length) {
      this.setCurrentPicture(++this._currentSlide);
    }
  };

  Gallery.prototype._onHashChange = function() {
    if (location.hash.match(/#photo\/(\S+)/) !== null) {
      this.setCurrentPicture(location.hash.substr(7));
      this.show();
    }
  };

  window.Gallery = Gallery;
})();
