const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Подключение .env
dotenv.config();

// Подключение к БД
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flashdrives')
	.then(() => console.log("✅ MongoDB подключен"))
	.catch(err => console.error("❌ Ошибка подключения к MongoDB:", err));

// Создание приложения
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Роуты
app.use('/api', require('./routes/flashDrives'));

// Главная страница
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});