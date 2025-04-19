const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'application/javascript',
	'.json': 'application/json',
	'.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
	let filePath = req.url === '/' ? '/html/index.html' : req.url;
	const ext = path.extname(filePath);
	const fullPath = path.join(__dirname, filePath);

	fs.readFile(fullPath, (err, content) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Файл не найден');
		} else {
			res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
			res.end(content);
		}
	});
});

server.listen(3000, () => {
	console.log('Сервер запущен на http://localhost:3000');
});
