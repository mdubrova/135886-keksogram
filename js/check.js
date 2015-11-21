function getMessage(a, b) {

	var a = typeof a;
	var b = typeof b;

	if (a == "boolean" && a == true) {
	  return ("Переданное GIF-изображение анимировано и содержит" + b + "кадров" );
	} else {
	  return ('Переданное GIF-изображение не анимировано');
	}

	if (a == "number") {
	   var attr = b*4
	   return ("Переданное SVG-изображение содержит" + a + "объектов и" + attr + "аттрибутов");
	  }

    if (a.constractor == Array) {
	     var arr = a;
		 var result = arr.reduce(function(sum, current) {
		 return sum + current;
		 }, 0);
		 return ("Количество красных точек во всех строчках изображения:" + result);
    }

    if (a.constractor == Array && b.constractor == Array) {
    	var arr = a;
    	var arr2 = b;

    	var arr3 = arr.map(function(value, index){ return value * arr2[index] });
    	var square = arr3.reduce(function(sum, current) {
	    return sum + current;
	    }, 0);
        return ("Общая площадь артефактов сжатия:" + square + "пикселей")
    }
}

