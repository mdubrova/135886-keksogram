/* global define:true */

'use strict';

define(function() {

 /**
  * @param {Object} data
  * @constructor
  * конструктор для создания обьекта Photo
  */
  function Photo(data) {
    this._data = data;
  }

  /**
   * создание элемента photo из шаблона
   */
  Photo.prototype.render = function() {
    var pictureTemplate = document.querySelector('#picture-template');
    this.element = pictureTemplate.content.children[0].cloneNode(true);

    this.element.querySelector('.picture-comments').textContent = this._data.comments;
    this.element.querySelector('.picture-likes').textContent = this._data.likes;

    /**
     * @type {Image}
     */
    var image = new Image(182, 182);

    /**
     * функция которая при загрузке фотографии заполняет элемент картинкой
     */
    image.onload = function() {
      this.element.replaceChild(image, this.element.querySelector('img'));
    }.bind(this);


    /**
     * функция которая в случае ошибки при загрузке фотографии заполняет элемент специальной картинкой
     */
    image.onerror = function() {
      this.element.classList.add('picture-load-failure');
    }.bind(this);


    this.element.addEventListener('click', function(e) {
      e.preventDefault();
      if (!this.element.classList.contains('picture-load-failure')) {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      }
    }.bind(this));

    Photo.prototype.onClick = null;

    image.src = this._data.url;
  };

  return Photo;
});
