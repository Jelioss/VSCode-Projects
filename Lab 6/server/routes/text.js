const express = require('express');
const router = express.Router();
const Text = require('../models/Text');

router.post('/', async (req, res) => {
	try {
		const { text } = req.body;
		const wordCount = text.trim().split(/\s+/).length;
		const newText = new Text({ text, wordCount });
		await newText.save();
		res.status(201).json(newText);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const texts = await Text.find();
		res.json(texts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;