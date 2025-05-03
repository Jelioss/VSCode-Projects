import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Абсолютный путь к корню проекта
const __dirname = path.resolve();

// Пути к папкам
const PUBLIC_DIR = path.join(__dirname, 'public');
const RESOURCES_DIR = path.join(PUBLIC_DIR, 'resources/data');

// Создание папок при необходимости
if (!fs.existsSync(RESOURCES_DIR)) {
	fs.mkdirSync(RESOURCES_DIR, { recursive: true });
}

// Очистка файлов при запуске
const originalPath = path.join(RESOURCES_DIR, 'original.json');
const processedPath = path.join(RESOURCES_DIR, 'processed.json');

if (fs.existsSync(originalPath)) fs.truncateSync(originalPath);
if (fs.existsSync(processedPath)) fs.truncateSync(processedPath);

// Статические файлы
app.use(express.static(PUBLIC_DIR));

// Парсинг данных из формы
app.use(express.urlencoded({ extended: true }));

// Обработка POST-запроса
app.post('/process', (req, res) => {
	const text = req.body.text || '';

	let words = text.split(/\s+/).filter(word => word.trim() !== '');

	let processedWords = words.map(word => {
		if (word.length > 0) {
			return 'a' + word.slice(1);
		}
		return '';
	});

	processedWords.sort((a, b) => a.length - b.length);

	fs.writeFileSync(originalPath, JSON.stringify(words, null, 2), 'utf-8');
	fs.writeFileSync(processedPath, JSON.stringify(processedWords, null, 2), 'utf-8');

	res.redirect('/pages/processed.html');
});

// Эндпоинт для очистки
app.get('/clear', (req, res) => {
	if (fs.existsSync(originalPath)) fs.truncateSync(originalPath);
	if (fs.existsSync(processedPath)) fs.truncateSync(processedPath);
	res.redirect('/');
});

// Обработка ошибок
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Что-то пошло не так!');
});

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});