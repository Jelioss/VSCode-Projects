const FlashDrive = require('Lab 12/models/FlashDrive');

module.exports = async (req, res) => {
	try {
		const { manufacturer, capacity, warranty, stock } = req.body;
		const newFlash = new FlashDrive({ manufacturer, capacity, warranty, stock });
		await newFlash.save();
		res.status(201).json({ message: 'Record added successfully', data: newFlash });
	} catch (error) {
		res.status(500).json({ error: 'Failed to add record' });
	}
};