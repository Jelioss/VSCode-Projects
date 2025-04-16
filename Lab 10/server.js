const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME-типы для статических файлов
const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json'
};

// Функция для генерации массива
function generateArray() {
	return Array.from({ length: 100 }, () => Math.floor(Math.random() * 17) + 1);
}

// Функция для сохранения массива в файл
function saveArray(arr) {
	const folderPath = path.join(__dirname, 'resource');
	const filePath = path.join(folderPath, 'data.json');
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}
	fs.writeFileSync(filePath, JSON.stringify(arr));
}

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
	// Логирование запросов
	console.log(`Запрос: ${req.method} ${req.url}`);

	// Эндпоинт для получения данных
	if (req.url === '/data') {
		const array = generateArray(); // Генерация нового массива
		saveArray(array); // Сохранение массива в файл
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(array)); // Отправка массива клиенту
		return;
	}

	// Обработка статических файлов
	let filePath = '';
	if (req.url === '/') {
		filePath = path.join(__dirname, 'html', 'index.html');
	} else if (req.url.startsWith('/css/') || req.url.startsWith('/js/')) {
		filePath = path.join(__dirname, req.url);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
		return;
	}

	const ext = path.extname(filePath);
	const contentType = mimeTypes[ext] || 'text/plain';

	fs.readFile(filePath, (err, content) => {
		if (err) {
			console.error('Ошибка чтения файла:', filePath);
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Not Found');
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content);
		}
	});
});

// Запуск сервера
server.listen(3000, () => {
	console.log('Сервер запущен на http://localhost:3000');
});