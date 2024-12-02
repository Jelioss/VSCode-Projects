// Класс для управления блоком автомобилей
class CarManager {
	constructor() {
		this.cars = new Map([
			[1, "BMW X5"],
			[2, "BMW M3"],
			[3, "BMW Z4"]
		]);
		this.titles = new Set(["Производитель: BMW"]);
		this.descriptions = new Set(["Динамичный дизайн", "Исключительная производительность"]);
	}

	addCar(position, carName) {
		if (position === 'end') {
			this.cars.set(this.cars.size + 1, carName);
		} else {
			this.cars.set(parseInt(position), carName);
		}
	}

	updateTitle(newTitle) {
		this.titles.add(newTitle);
	}

	addDescription(newDescription) {
		this.descriptions.add(newDescription);
	}

	renderCars() {
		const carList = document.getElementById('car-list');
		 carList.innerHTML = ''; // Очистить список
		this.cars.forEach((name) => {
			const li = document.createElement('li');
			li.textContent = name;
			carList.appendChild(li);
		});
	}

	renderTitle() {
		const title = Array.from(this.titles).pop();
		document.getElementById('car-title').textContent = title;
	}

	renderDescriptions() {
		const descriptions = Array.from(this.descriptions);
		document.getElementById('car-description-1').textContent = descriptions[0] || '';
		document.getElementById('car-description-2').textContent = descriptions[1] || '';
	}
}

// Класс-наследник для дополнительных функций
class AdvancedCarManager extends CarManager {
	insertCar(carName, position) {
		this.addCar(position, carName);
		this.renderCars();
	}

	changeTitle(newTitle) {
		this.updateTitle(newTitle);
		this.renderTitle();
	}

	insertDescription(newDescription, above = true) {
		this.addDescription(newDescription);
		const newParagraph = document.createElement('p');
		newParagraph.textContent = newDescription;
		const referenceNode = document.getElementById(above ? 'car-description-1' : 'car-description-2');
		referenceNode.parentNode.insertBefore(newParagraph, referenceNode.nextSibling);
	}
}

// Создание экземпляра класса
const manager = new AdvancedCarManager();
manager.renderCars();
manager.renderTitle();
manager.renderDescriptions();

// Обработчики событий
document.getElementById('add-car').addEventListener('click', () => {
	const carName = prompt('Введите название автомобиля:');
	const position = document.getElementById('position').value;
	if (carName) {
		manager.insertCar(carName, position);
	}
});

document.getElementById('update-title').addEventListener('click', () => {
	const newTitle = prompt('Введите новый заголовок:');
	if (newTitle) {
		manager.changeTitle(newTitle);
	}
});

document.getElementById('add-paragraph').addEventListener('click', () => {
	const newDescription = prompt('Введите описание:');
	if (newDescription) {
		manager.insertDescription(newDescription, position);
	}
});
