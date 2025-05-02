const mongoose = require('mongoose');

const FlashDriveSchema = new mongoose.Schema({
	manufacturer: { type: String, required: true },
	capacity: { type: Number, required: true },
	warrantyPeriod: { type: Number, required: true },
	stock: { type: Number, required: true }
});

module.exports = mongoose.model('FlashDrive', FlashDriveSchema);