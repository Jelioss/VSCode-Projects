const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Загрузка переменных окружения
dotenv.config();

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/companies')
	.then(() => console.log("MongoDB подключена"))
	.catch(err => console.error("Ошибка подключения к MongoDB:", err));

// Создание приложения
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Модель
const Company = require('./models/Company');

// Роуты
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Добавление компании
app.post('/api/add', async (req, res) => {
	try {
		const { name, isProduction, employees, averageSalary } = req.body;
		const newOrg = new Company({
			name,
			isProduction: isProduction === "true",
			employees: parseInt(employees),
			averageSalary: parseFloat(averageSalary)
		});
		await newOrg.save();
		res.redirect('/');
	} catch (err) {
		res.status(500).send("Ошибка при добавлении");
	}
});

// Удаление компаний с числом сотрудников < X
app.post('/api/delete-by-employees', async (req, res) => {
	try {
		const { employeeCount } = req.body;
		await Company.deleteMany({ employees: { $lt: parseInt(employeeCount) } });
		res.redirect('/');
	} catch (err) {
		res.status(500).send("Ошибка при удалении");
	}
});

// Получение списка компаний
app.get('/api/companies', async (req, res) => {
	try {
		const orgs = await Company.find();
		res.json(orgs);
	} catch (err) {
		res.status(500).json({ error: "Ошибка при получении данных" });
	}
});

// Фильтрация по количеству сотрудников
app.get('/api/filter-by-employees/:count', async (req, res) => {
	try {
		const { count } = req.params;
		const orgs = await Company.find({ employees: { $lt: parseInt(count) } });
		res.json(orgs);
	} catch (err) {
		res.status(500).json({ error: "Ошибка при фильтрации" });
	}
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});