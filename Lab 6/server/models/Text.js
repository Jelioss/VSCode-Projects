const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
	text: String,
	wordCount: Number,
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Text', textSchema);