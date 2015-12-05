'use strict';

(function() {
  var filters = document.querySelector('.filters');
  var pictureBlock = document.querySelector('.pictures');
  var loadedPictures = null;
  filters.classList.remove('hidden');

  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickedElementId = evt.target.id;
      setActiveFilter(clickedElementId);
    };
  }

  function setActiveFilter(id) {
    var filteredPictures = loadedPictures.slice(0);
    switch (id) {
      case 'filter-popular':
        filteredPictures = filteredPictures.sort(function(a, b) {
          return b.likes - a.likes;
        });
        break;
      case 'filter-new':
        filteredPictures = filteredPictures.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return b - a;
        });
        break;
      case 'filter-discussed':
        filteredPictures = filteredPictures.sort(function(a, b) {
          return b.comments - a.comments;
        });
        break;
    }

    renderPictures(filteredPictures);
  }
  getPictures();
  function renderPictures(pictures) {
    pictureBlock.innerHTML = '';
    pictures.forEach(function(picture) {
     var nodeElement = getElementFromTemplate(picture);
     pictureBlock.appendChild(nodeElement);
   });
  }

  function getPictures() {
    document.querySelector('.pictures').classList.add('pictures-loading');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/pictures.json');
    xhr.onload = function(evt) {
      var data = evt.target.response;
      loadedPictures = JSON.parse(data);
      pictureBlock.classList.remove('pictures-loading');
      renderPictures(loadedPictures);
    };

    xhr.onerror = function() {
      pictureBlock.classList.remove('pictures-loading');
      pictureBlock.classList.add('pictures-failure');
    };

    xhr.send();
  }

  function getElementFromTemplate(data) {
    var pictureTemplate = document.querySelector('#picture-template');
    var duplicate = pictureTemplate.content.children[0].cloneNode(true);

    duplicate.querySelector('.picture-comments').textContent = data.comments;
    duplicate.querySelector('.picture-likes').textContent = data.likes;

    var image = new Image(182, 182);

    image.onload = function() {
      duplicate.replaceChild(image, duplicate.querySelector('img'));
    };

    image.onerror = function() {
      duplicate.classList.add('picture-load-failure');
    };

    image.src = data.url;

    return duplicate;
  }
  filters.classList.remove('hidden');
})();
