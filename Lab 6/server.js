const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
	// Относительные пути
	const indexPath = path.join(__dirname, 'html', 'index.html');
	const cssPath = path.join(__dirname, 'css', 'style.css');
	const data1Path = path.join(__dirname, 'resources', 'data1.json');
	const data2Path = path.join(__dirname, 'resources', 'data2.json');

	try {
		if (req.url === '/' || req.url === '/index.html') {
			const data = await fs.readFile(indexPath);
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		} else if (req.url === '/css/style.css') {
			const data = await fs.readFile(cssPath);
			res.writeHead(200, { 'Content-Type': 'text/css' });
			res.end(data);
		} else if (req.url === '/api/data1') {
			const data = await fs.readFile(data1Path);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(data);
		} else if (req.url === '/api/data2') {
			const data = await fs.readFile(data2Path);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(data);
		} else {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Страница не найдена');
		}
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('Ошибка сервера');
		console.error(err);
	}
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}/`);
});