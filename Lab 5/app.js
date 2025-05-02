const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Загружаем переменные из .env файла
dotenv.config();

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flashdrives')
	.then(() => console.log("✅ MongoDB подключен"))
	.catch(err => console.error("❌ Ошибка подключения к MongoDB:", err));

// Модель
const FlashDrive = require('./models/FlashDrive');

const app = express();

// Middleware для статики (для загрузки файлов из папки public)
app.use(express.static(path.join(__dirname, 'public')));

// Настройка парсинга данных из тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Роуты
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

// Добавление
app.post('/api/add', async (req, res) => {
	try {
		const { manufacturer, capacity, warrantyPeriod, stock } = req.body;
		const newDrive = new FlashDrive({ manufacturer, capacity, warrantyPeriod, stock });
		await newDrive.save();
		res.redirect('/');
	} catch (err) {
		res.status(500).send("Ошибка при добавлении");
	}
});

// Удаление по гарантии
app.post('/api/delete-by-warranty', async (req, res) => {
	try {
		const { warranty } = req.body;
		await FlashDrive.deleteMany({ warrantyPeriod: { $lt: parseInt(warranty) } });
		res.redirect('/');
	} catch (err) {
		res.status(500).send("Ошибка при удалении");
	}
});

// Фильтрация по гарантии
app.get('/api/filter-by-warranty/:warranty', async (req, res) => {
	try {
		const { warranty } = req.params;
		const warrantyNum = parseInt(warranty);

		if (isNaN(warrantyNum)) {
			return res.status(400).json({ error: "Неверное значение" });
		}

		const drives = await FlashDrive.find({ warrantyPeriod: { $lt: warrantyNum } });
		res.json(drives.map(d => d.manufacturer));
	} catch (err) {
		res.status(500).json({ error: "Ошибка на сервере" });
	}
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
