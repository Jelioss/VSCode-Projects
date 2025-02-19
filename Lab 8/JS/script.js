// Коллекция изображений для слайдера
const images = new Map([
	[1, "https://i.imgur.com/ZSBpvQb.png"],
	[2, "https://i.imgur.com/xdgj3Zf.jpeg"],
	[3, "https://i.imgur.com/wehQ1GV.jpeg"],
	[4, "https://i.imgur.com/kRK9SZD.png"],
]);

// Получение элементов DOM
const slider = document.getElementById("slider");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const delayInput = document.getElementById("delayInput");
const endMessage = document.getElementById("endMessage");

// Переменные состояния
let currentIndex = 0;
let intervalId = null;

// Функция для отображения текущего слайда
function showSlide(index) {
	const imageSrc = images.get(index);
	if (imageSrc) {
		slider.innerHTML = `<img src="${imageSrc}" alt="Slide ${index}">`;
	}
}

// Функция для начала показа слайдера
function startSlider() {
	clearInterval(intervalId); // Очистка предыдущего интервала
	currentIndex = 0; // Сброс индекса
	endMessage.classList.add("hidden"); // Скрытие сообщения об окончании

	// Задержка перед началом показа
	setTimeout(() => {
		intervalId = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.size; // Циклический переход
			showSlide(currentIndex + 1);

			// Если достигнут конец слайдера
			if (currentIndex === images.size - 1) {
				setTimeout(() => {
					endMessage.classList.remove("hidden"); // Показ сообщения об окончании
					clearInterval(intervalId); // Остановка интервала
				}, 1000); // Дополнительная задержка перед сообщением
			}
		}, delayInput.value * 1000); // Интервал в миллисекундах
	}, delayInput.value * 1000); // Задержка перед началом
}

// Функция для остановки слайдера
function stopSlider() {
	clearInterval(intervalId);
	slider.innerHTML = ""; // Очистка слайдера
	endMessage.classList.add("hidden"); // Скрытие сообщения об окончании
}

// Обработчики событий
startButton.addEventListener("click", startSlider);
stopButton.addEventListener("click", stopSlider);