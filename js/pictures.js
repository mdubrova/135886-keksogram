/* global pictures: true */
'use strict';

(function() {
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');

  pictures.forEach(function(picture) {
   var nodeElement = getElementFromTemplate(picture);
   document.querySelector('.pictures').appendChild(nodeElement);
  });

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