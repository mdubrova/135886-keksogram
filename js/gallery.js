(function() {

 /**
  * @param {Object} data
  * @constractor
  */

  function Gallery() {
	this.element = document.querySelector('.gallery-overlay');
  };

  Gallery.prototype.show = function () {
    this.element.ClassList.remove('hidden');
  };

  Gallery.prototype.hide = function () {
    this.element.ClassList.add('hidden');
  }; 
  
  window.Gallery = Gallery;
})();