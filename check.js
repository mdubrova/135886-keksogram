function getMessage(a, b) {

	var a = typeof a
	var b = typeof b

	if (a == "boolean" && a == true) {
	  return ("Переданное GIF-изображение анимировано и содержит" + b + "кадров" );
	} else {
	  return ('Переданное GIF-изображение не анимировано');
	}

	if (a == "number") {
	   var attr = b*4
	   return ("Переданное SVG-изображение содержит" + var a + "объектов и" + attr + "аттрибутов");
	  }

	  if ()

    if (a == "object") {
     var arr = a
	 var result = arr.reduce(function(sum, current) {
	 return sum + current;
	 }, 0);
	 return ("Количество красных точек во всех строчках изображения:" + result)
    }
}

