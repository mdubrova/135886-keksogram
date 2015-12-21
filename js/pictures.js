/* global Photo: true */
/* global Gallery: true */

'use strict';

(function() {
  var filters = document.querySelector('.filters');
  var pictureBlock = document.querySelector('.pictures');
  var loadedPictures = null;
  var scrollInterval;

  /**
   * @type {Gallery}
   */
  var gallery = new Gallery();

  filters.classList.remove('hidden');

  var currentPage = 0;
  var PAGE_SIZE = 12;

  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickedElementId = evt.target.id;
      setActiveFilter(clickedElementId);
    };
  }

  getPictures();

  clearInterval(scrollInterval);
  scrollInterval = setInterval(addPageToScroll, 100);

  window.addEventListener('scroll', function() {
    addPageToScroll();
  });

  function addPageToScroll() {
    var picturesCoord = document.querySelector('.pictures').getBoundingClientRect();
    if (loadedPictures !== null && picturesCoord.bottom - 50 <= window.innerHeight) {
      renderPictures(loadedPictures, ++currentPage);
    }
  }

  /**
   * функция загрузки фотографий
   */
  function getPictures() {
    document.querySelector('.pictures').classList.add('pictures-loading');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/pictures.json');
    xhr.timeout = 1000;
    xhr.onload = function(evt) {
      // setTimeout(function() {
      var data = evt.target.response;
      loadedPictures = JSON.parse(data);
      pictureBlock.classList.remove('pictures-loading');
      setActiveFilter('filter-popular');
      // }, 5000);
    };

    xhr.onerror = function() {
      pictureBlock.classList.remove('pictures-loading');
      pictureBlock.classList.add('pictures-failure');
    };

    xhr.send();
  }

  /**
   * Функция отрисовки фотографий
   * @param {Array, <Object>} pictures
   * @param {number} pageNumber
   * @param {boolean} replace
   */
  function renderPictures(pictures, pageNumber, replace) {
    if (replace) {
      pictureBlock.innerHTML = '';
    }
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePictures = pictures.slice(from, to);

    pagePictures.forEach(function(picture) {
      var photoElement = new Photo(picture);
      photoElement.render();
      pictureBlock.appendChild(photoElement.element);
      photoElement.onClick = function() {
        gallery.setCurrentPicture(loadedPictures.indexOf(picture));
        gallery.show();
      };
    });
  }

  /**
   * показывание галереи
   * @param {Event} evt
   */
  //function _onClick(evt) {
    //evt.preventDefault();
    //gallery.show();
  //}


  //function getElementFromTemplate(data) {
    //var pictureTemplate = document.querySelector('#picture-template');
    //var duplicate = pictureTemplate.content.children[0].cloneNode(true);

    //duplicate.querySelector('.picture-comments').textContent = data.comments;
    //duplicate.querySelector('.picture-likes').textContent = data.likes;

    //var image = new Image(182, 182);

    //image.onload = function() {
      //duplicate.replaceChild(image, duplicate.querySelector('img'));
    //};

    //image.onerror = function() {
      //duplicate.classList.add('picture-load-failure');
    //};

    //image.src = data.url;

    //return duplicate;
  //}

  /**
   * Сортирует список фотографий на основании id выбранного фильтра и отрисосывает отсортированние фотографии
   * @param {string} id
   */
  function setActiveFilter(id) {
    switch (id) {
      case 'filter-popular':
        loadedPictures.sort(function(a, b) {
          return b.likes - a.likes;
        });
        break;
      case 'filter-new':
        loadedPictures.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return b - a;
        });
        break;
      case 'filter-discussed':
        loadedPictures.sort(function(a, b) {
          return b.comments - a.comments;
        });
        break;
    }
    currentPage = 0;
    gallery.setPictures(loadedPictures);
    renderPictures(loadedPictures, currentPage, true);
  }

})();
