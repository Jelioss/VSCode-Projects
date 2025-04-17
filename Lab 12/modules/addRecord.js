const FlashDrive = require('../models/flashDrive');

const addRecord = async (req, res) => {
	try {
		const flashDrive = new FlashDrive(req.body);
		await flashDrive.save();
		res.status(201).send(flashDrive);
	} catch (error) {
		res.status(400).send(error);
	}
};

module.exports = addRecord;