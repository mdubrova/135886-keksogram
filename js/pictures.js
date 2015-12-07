'use strict';

(function() {
  var filters = document.querySelector('.filters');
  var pictureBlock = document.querySelector('.pictures');
  var loadedPictures = null;
  var filteredPictures = [];
  var picturesToLoad = null;

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

  window.addEventListener ('scroll', function(evt) {
    //debugger;
   var picturesCoord = document.querySelector('.pictures').getBoundingClientRect();
   var viewPortSize = window.innerHeight;
   if (picturesCoord.bottom - 50 <= window.innerHeight) {
      if(currentPage < Math.ceil(loadedPictures.length / PAGE_SIZE)) {
        //alert(pictureBlock.childNodes.length);
        renderPictures(loadedPictures, ++currentPage)
      }
    }
  });

  function getPictures() {
    document.querySelector('.pictures').classList.add('pictures-loading');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/pictures.json');
    xhr.onload = function(evt) {
      var data = evt.target.response;
      loadedPictures = JSON.parse(data);
      pictureBlock.classList.remove('pictures-loading');
      setActiveFilter('filter-popular');
      //renderPictures(loadedPictures, 0, true);
    };

    xhr.onerror = function() {
      pictureBlock.classList.remove('pictures-loading');
      pictureBlock.classList.add('pictures-failure');
    };

    xhr.send();
  }

  function renderPictures(pictures, pageNumber, replace) {
    if (replace) { 
      pictureBlock.innerHTML = '';  
    }

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePictures = pictures.slice(from, to);
    pagePictures.forEach(function(picture) {
      var nodeElement = getElementFromTemplate(picture);
      pictureBlock.appendChild(nodeElement);
    });
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

  function setActiveFilter(id) {
    //filteredPictures = loadedPictures.slice(0);
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
    renderPictures(loadedPictures, currentPage, true);
  }

})();
