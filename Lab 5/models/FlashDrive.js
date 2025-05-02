const mongoose = require('mongoose');

const flashDriveSchema = new mongoose.Schema({
	manufacturer: String,
	capacity: Number,
	warranty: Number,
	stock: Number
});

module.exports = mongoose.model('FlashDrive', flashDriveSchema);	