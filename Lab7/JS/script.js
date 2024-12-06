// Класс для управления блоком автомобилей
class CarManager {
	constructor() {
		// Коллекция Map для хранения автомобилей в формате: номер -> название
		this.cars = new Map([
			[1, "BMW X5"],
			[2, "BMW M3"],
			[3, "BMW Z4"]
		]);
		// Коллекция Set для уникальных заголовков
		this.titles = new Set(["Производитель: BMW"]);
		// Коллекция Set для уникальных описаний автомобилей
		this.descriptions = new Set(["Динамичный дизайн", "Исключительная производительность"]);
	}

	addCar(position, carName) {
		if (position === 'end') { //=== — оператор строгого равенства возвращает true
			// Если позиция 'end', добавляем автомобиль в конец
			this.cars.set(this.cars.size + 1, carName);
		} else {
			// Если указана конкретная позиция, добавляем по этому номеру
			this.cars.set(parseInt(position), carName);
		}
	}

	updateTitle(newTitle) {
		this.titles.add(newTitle); // Добавляет новый заголовок в коллекцию titles
	}

	addDescription(newDescription) {
		this.descriptions.add(newDescription); // Добавляет новое описание
	}

	renderCars() {
		const carList = document.getElementById('car-list');
		carList.innerHTML = ''; // Очистить список
		this.cars.forEach(function (name) {
			// Создаёт новый <li> для каждого автомобиля и добавляет его в DOM
			const li = document.createElement('li');
			li.textContent = name;
			carList.appendChild(li);
		});
	}

	renderTitle() {
		// Извлекает последний добавленный заголовок
		const title = Array.from(this.titles).pop();
		// Устанавливает его в элемент с ID 'car-title'
		document.getElementById('car-title').textContent = title;
	}

	renderDescriptions() {
		const descriptions = Array.from(this.descriptions); // Преобразует Set в массив
		// Устанавливает первые два описания в элементы DOM
		document.getElementById('car-description-1').textContent = descriptions[0] || '';
		document.getElementById('car-description-2').textContent = descriptions[1] || '';
	}
}

// Класс-наследник для использования дополнительных методов
class AdvancedCarManager extends CarManager {
	insertCar(carName, position) {
		this.addCar(position, carName); // Использует метод из базового класса
		this.renderCars(); // Перерисовывает список автомобилей
	}

	changeTitle(newTitle) {
		this.updateTitle(newTitle); 
		this.renderTitle();
	}

	insertDescription(newDescription, above) {
		this.addDescription(newDescription);
		const newParagraph = document.createElement('p'); 
		newParagraph.textContent = newDescription; 
		const referenceNode = document.getElementById(above ? 'car-description-1' : 'car-description-2');
		// вставляет newParagraph перед следующим элементом
		referenceNode.parentNode.insertBefore(newParagraph, referenceNode.nextSibling);
	}
}

// Создание экземпляра класса
const manager = new AdvancedCarManager();
manager.renderCars();
manager.renderTitle();
manager.renderDescriptions();

// Обработчики событий
document.getElementById('add-car').addEventListener('click', function () {
	const carName = prompt('Введите название автомобиля:');
	const position = document.getElementById('position').value;
	if (carName) {
		manager.insertCar(carName, position);
	}
});

document.getElementById('update-title').addEventListener('click', function () {
	const newTitle = prompt('Введите новый заголовок:');
	if (newTitle) {
		manager.changeTitle(newTitle);
	}
});

document.getElementById('add-paragraph').addEventListener('click', function () {
	const newDescription = prompt('Введите описание:');
	if (newDescription) {
		manager.insertDescription(newDescription, true); 
	}
});
