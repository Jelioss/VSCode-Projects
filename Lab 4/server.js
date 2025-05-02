const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME-типы для статических файлов
const mimeTypes = {
	'.html': 'text/html',
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.json': 'application/json'
};

// Генерация массива из 100 случайных чисел
function generateArray() {
	return Array.from({ length: 100 }, () => (Math.random() * 16 + 1).toFixed(2)); // Числа от 1 до 17
}

// Сохранение массива в файл
function saveArray(arr, filename) {
	const folderPath = path.join(__dirname, 'resource');
	const filePath = path.join(folderPath, filename);
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}
	fs.writeFileSync(filePath, JSON.stringify(arr));
}

// Чтение массива из файла
function readArray(filename) {
	const filePath = path.join(__dirname, 'resource', filename);
	if (fs.existsSync(filePath)) {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	}
	return [];
}

// Генерация и сохранение исходного массива при запуске сервера
const array = generateArray();
saveArray(array, 'before.json');

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
	console.log(`Запрос: ${req.method} ${req.url}`);

	// Эндпоинт для получения исходного массива
	if (req.url === '/get-data') {
		const data = readArray('before.json');
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(data));
		return;
	}

	// Эндпоинт для получения отсортированного массива
	if (req.url === '/sorted-data') {
		const data = readArray('after.json');
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(data));
		return;
	}

	// Обработка POST-запроса для сортировки массива
	if (req.url === '/sort' && req.method === 'POST') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			try {
				const { order } = JSON.parse(body);
				const array = readArray('before.json');
				const sortedArray = order === 'asc'
					? array.sort((a, b) => a - b)
					: array.sort((a, b) => b - a);
				saveArray(sortedArray, 'after.json'); // Сохраняем отсортированный массив
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ sortedArray }));
			} catch (error) {
				console.error('Ошибка сортировки:', error.message);
				res.writeHead(400, { 'Content-Type': 'text/plain' });
				res.end('Bad Request');
			}
		});
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
