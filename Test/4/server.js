const http = require('http');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.json': 'application/json'
};

const server = http.createServer((req, res) => {
	console.log(`Запрос: ${req.method} ${req.url}`);

	// Сохранение данных в XML
	if (req.url === '/save-xml' && req.method === 'POST') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			try {
				const data = JSON.parse(body);
				const builder = new xml2js.Builder();
				const xml = builder.buildObject({ formData: data });
				const filePath = path.join(__dirname, 'resource', 'data.xml');
				fs.writeFileSync(filePath, xml);
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Data saved' }));
			} catch (error) {
				console.error('Ошибка сохранения:', error.message);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Server Error');
			}
		});
		return;
	}

	// Чтение данных из XML
	if (req.url === '/load-xml' && req.method === 'GET') {
		const filePath = path.join(__dirname, 'resource', 'data.xml');
		if (fs.existsSync(filePath)) {
			const xml = fs.readFileSync(filePath, 'utf8');
			xml2js.parseString(xml, (err, result) => {
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end('Server Error');
				} else {
					const data = result.formData || {};
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(data));
				}
			});
		} else {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('File Not Found');
		}
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

server.listen(3000, () => {
	console.log('Сервер запущен на http://localhost:3000');
});