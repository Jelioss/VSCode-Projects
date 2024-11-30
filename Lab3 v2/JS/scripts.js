document.getElementById('button1').addEventListener('click', function () {
	var paragraphs = document.querySelectorAll('#main-block > p');
	paragraphs.forEach(function (p, index) {
			  if ((index + 1) % 2 === 0) { // Четные параграфы
						 p.style.fontFamily = 'Comic Sans MS, cursive, sans-serif'; // Изменить шрифт
						 p.style.color = 'red'; // Изменить цвет
						 p.style.fontSize = '24px'; // Изменить размер
			} else {
						 p.style.opacity = '0'; // Переход CSS обрабатывает эффект
			}
	});
});

document.getElementById('button2').addEventListener('click', function () {
	// Увеличить размер первых двух изображений на 30%
	var images = document.querySelectorAll('#child-block > img:nth-of-type(-n+2)');
	images.forEach(function (img) {
			var currentWidth = img.offsetWidth;
			  img.style.width = (currentWidth * 1.3) + 'px';
	});

	// Обвести все элементы второго параграфа заданной рамкой
	var secondPara = document.querySelector('#main-block > p:nth-of-type(2)');
	secondPara.style.border = '3px solid blue'; // Заданный цвет и толщина
	secondPara.style.padding = '5px'; // Добавить отступ, чтобы содержимое не прилегало вплотную к границе

	// Добавить "LONDON" в конец последнего параграфа
	var lastPara = document.querySelector('#main-block > p:last-of-type');
	lastPara.innerHTML += ' LONDON';
});