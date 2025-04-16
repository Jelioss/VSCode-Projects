// Коллекция изображений для слайдера
const images = new Map([
	[1, "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
	[2, "https://images.pexels.com/photos/356003/pexels-photo-356003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
	[3, "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"],
	[4, "https://images.pexels.com/photos/257541/pexels-photo-257541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
]);

// Получение элементов DOM
const slider = document.getElementById("slider");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const delayInput = document.getElementById("delayInput");
const startDelayInput = document.getElementById("startDelayInput");

// Переменные состояния
let currentIndex = 0;
let intervalId = null;
let startTimeoutId = null;

// Функция для отображения текущего слайда
function showSlide(index) {
	const imageSrc = images.get(index);
	if (imageSrc) {
		slider.innerHTML = `<img src="${imageSrc}" alt="Slide ${index}">`;
	}
}

// Функция для начала показа слайдера
function startSlider() {
	const startDelay = parseInt(startDelayInput.value, 10); // Преобразование в целое число
	const slideDelay = parseInt(delayInput.value, 10);

	// Проверка корректности введенных значений
	if (isNaN(startDelay) || isNaN(slideDelay) || startDelay < 1 || slideDelay < 1) {
		alert("Пожалуйста, введите корректные значения для задержек.");
		return;
	}

	clearInterval(intervalId); // Очистка предыдущего интервала
	clearTimeout(startTimeoutId); // Очистка предыдущего таймера

	// Задержка перед началом показа
	startTimeoutId = setTimeout(() => {
		intervalId = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.size; // Циклический переход
			showSlide(currentIndex + 1);

			if (currentIndex === images.size - 1) {
				setTimeout(() => {
					clearInterval(intervalId); // Остановка интервала
					showModal(); // Показ модального окна
				}, slideDelay * 1000);
			}
		}, slideDelay * 1000);
	}, startDelay * 1000); // Начальная задержка в миллисекундах
}

// Функция для показа модального окна через window.open
function showModal() {
	const modalContent = "Показ слайдера завершен!";
	const windowWidth = 600; // Ширина окна
	const windowHeight = 400; // Высота окна


	const leftPosition = (window.screen.width - windowWidth) / 2;
	const topPosition = (window.screen.height - windowHeight) / 2;


	const modalWindow = window.open(
		"",
		"_test",
		`width=${windowWidth},height=${windowHeight},left=${leftPosition},top=${topPosition},resizable=no,scrollbars=no`
	);

	// Заполнение содержимого окна
	modalWindow.document.write(`
		<html>
		<head>
			<title>Сообщение</title>
			<style>
					body {
						font-family: Arial, sans-serif;
						text-align: center;
						margin: 0;
						padding: 0;
						height: 100%;
						background: linear-gradient(135deg, #6a11cb, #2575fc); 
						color: white; 
						display: flex;
						justify-content: center;
						align-items: center;
					}
					h1 {
						font-size: 28px;
						letter-spacing: 1px;
						text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
					}
					button {
						margin-top: 20px;
						padding: 10px 20px;
						background: linear-gradient(135deg, #8a2be2, #6a0dad); 
						color: white;
						border: none;
						border-radius: 5px;
						cursor: pointer;
						transition: transform 0.2s ease, background 0.3s ease;
					}
					button:hover {
						background: linear-gradient(135deg, #7a1bcf, #5a099d); 
					}
					button:active {
						transform: scale(0.95);
					}
		</style>
		</head>
		<body>
			<div>
					<h1>${modalContent}</h1>
					<button onclick="window.close()">Закрыть</button>
			</div>
		</body>
		</html>
	`);
	modalWindow.document.close();
}

// Функция для остановки слайдера
function stopSlider() {
	clearInterval(intervalId); // Остановка интервала
	clearTimeout(startTimeoutId); // Остановка начального таймера
	slider.innerHTML = ""; // Очистка слайдера
}

// Обработчики событий
startButton.addEventListener("click", startSlider);
stopButton.addEventListener("click", stopSlider);