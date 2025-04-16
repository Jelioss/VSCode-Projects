const mongoose = require('mongoose');

const flashDriveSchema = new mongoose.Schema({
	manufacturer: { type: String, required: true },
	capacity: { type: Number, required: true },
	warranty: { type: Number, required: true },
	stock: { type: Number, required: true }
});

module.exports = mongoose.model('FlashDrive', flashDriveSchema);