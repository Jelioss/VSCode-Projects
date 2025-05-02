const mongoose = require('mongoose');

const FlashDriveSchema = new mongoose.Schema({
	manufacturer: { type: String, required: true },
	capacity: { type: Number, required: true }, // Объём в Гб
	warrantyPeriod: { type: Number, required: true }, // Гарантия в месяцах
	stock: { type: Number, required: true } // Количество на складе
});

module.exports = mongoose.model('FlashDrive', FlashDriveSchema);