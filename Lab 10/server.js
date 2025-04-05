const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json'
};

function generateArray() {
	return Array.from({ length: 100 }, () => Math.floor(Math.random() * 17) + 1);
}

function saveArray(arr) {
	const folderPath = path.join(__dirname, 'resource');
	const filePath = path.join(folderPath, 'data.json');
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}
	fs.writeFileSync(filePath, JSON.stringify(arr));
}

// Генерация и сохранение массива
const array = generateArray();
saveArray(array);

const server = http.createServer((req, res) => {
	console.log('Запрос:', req.url);

	if (req.url === '/data') {
		const filePath = path.join(__dirname, 'resource', 'data.json');
		const data = fs.readFileSync(filePath, 'utf8');
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(data);
		return;
	}

	let filePath = '';

	if (req.url === '/') {
		filePath = path.join(__dirname, 'html', 'index.html');
	} else if (req.url.startsWith('/css/')) {
		filePath = path.join(__dirname, req.url);
	} else if (req.url.startsWith('/js/')) {
		filePath = path.join(__dirname, req.url);
	} else {
		res.writeHead(404);
		res.end('Not Found');
		return;
	}

	const ext = path.extname(filePath);
	const contentType = mimeTypes[ext] || 'text/plain';

	fs.readFile(filePath, (err, content) => {
		if (err) {
			console.error('Ошибка чтения файла:', filePath);
			res.writeHead(404);
			res.end('Not Found');
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content);
		}
	});
});

server.listen(3000, () => {
	console.log('Сервер запущен на http://localhost:3000');
});
