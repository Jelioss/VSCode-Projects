const express = require('express');
const router = express.Router();
const FlashDrive = require('../models/FlashDrive');

// Добавление нового накопителя
router.post('/add', async (req, res) => {
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
router.post('/delete-by-warranty', async (req, res) => {
	try {
		const { warranty } = req.body;
		await FlashDrive.deleteMany({ warrantyPeriod: { $lt: parseInt(warranty) } });
		res.redirect('/');
	} catch (err) {
		res.status(500).send("Ошибка при удалении");
	}
});

// Получить производителей с гарантией < X
router.get('/filter-by-warranty/:warranty', async (req, res) => {
	try {
		const { warranty } = req.params;
		const drives = await FlashDrive.find({ warrantyPeriod: { $lt: parseInt(warranty) } });
		res.json(drives.map(d => d.manufacturer));
	} catch (err) {
		res.status(500).json({ error: "Ошибка при фильтрации" });
	}
});

module.exports = router;