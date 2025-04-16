const FlashDrive = require('../models/flashDrive');

module.exports = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await FlashDrive.findByIdAndUpdate(id, updates, { new: true });
		if (!result) return res.status(404).json({ error: 'Record not found' });
		res.json({ message: 'Record updated successfully', data: result });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update record' });
	}
};