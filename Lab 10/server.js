const http = require('http');
const fs = require('fs');
const path = require('path');

// Генерация массива из 100 случайных чисел
function generateRandomArray() {
	const array = [];
	for (let i = 0; i < 100; i++) {
		array.push((Math.random() * 16 + 1).toFixed(2)); // Числа от 1 до 17
	}
	return array;
}
// Запись данных в файл
function writeDataToFile(filename, data) {
	fs.writeFileSync(path.join(__dirname, 'data', filename), JSON.stringify(data));
}
// Чтение данных из файла
function readDataFromFile(filename) {
	return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', filename), 'utf-8'));
}
// Инициализация данных
const randomArray = generateRandomArray();
writeDataToFile('before.json', randomArray);

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
	if (req.url === '/get-before' && req.method === 'GET') {
		// Отправка исходного массива
		const data = readDataFromFile('before.json');
		res.writeHead(200,
			{
				'Content-Type': 'application/json'
			});
		res.end(JSON.stringify(data));
	} else if (req.url === '/get-after' && req.method === 'GET') {
		// Отправка отсортированного массива
		const data = readDataFromFile('after.json');
		res.writeHead(200,
			{
				'Content-Type': 'application/json'
			});
		res.end(JSON.stringify(data));
	} else if (req.url === '/sort' && req.method === 'POST') {
		// Обработка сортировки
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const { order
			} = JSON.parse(body);
			const array = readDataFromFile('before.json');
			const sortedArray = order === 'asc'
				? array.sort((a, b) => a - b)
				: array.sort((a, b) => b - a);
			writeDataToFile('after.json', sortedArray);
			res.writeHead(200,
				{
					'Content-Type': 'application/json'
				});
			res.end(JSON.stringify(sortedArray));
		});
	} else {
		// Возвращаем index.html
		fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
			if (err) {
				res.writeHead(500,
					{
						'Content-Type': 'text/plain'
					});
				res.end('Internal Server Error');
			} else {
				res.writeHead(200,
					{
						'Content-Type': 'text/html'
					});
				res.end(data);
			}
		});
	}
});

// Обработка сортировки
req.on('end', () => {
	const { order } = JSON.parse(body);
	const array = readDataFromFile('before.json');
	const sortedArray = order === 'asc'
		? array.sort((a, b) => a - b)
		: array.sort((a, b) => b - a);

	// Логирование: выводим отсортированный массив в консоль
	console.log(`Отсортированный массив (${order}):`, sortedArray);

	// Записываем отсортированный массив в файл after.json
	writeDataToFile('after.json', sortedArray);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(sortedArray));
});
// Запуск сервера
server.listen(3000, () => {
	console.log('Сервер запущен на http: //localhost:3000');
});