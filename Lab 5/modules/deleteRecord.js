const FlashDrive = require('../models/flashDrive');

module.exports = async (req, res) => {
	try {
		const { id } = req.params;
		const { warranty } = req.query;

		if (warranty) {
			// Delete records with warranty less than specified
			const result = await FlashDrive.deleteMany({ warranty: { $lt: Number(warranty) } });
			res.json({ message: `${result.deletedCount} records deleted` });
		} else if (id) {
			// Delete specific record by ID
			const result = await FlashDrive.findByIdAndDelete(id);
			if (!result) return res.status(404).json({ error: 'Record not found' });
			res.json({ message: 'Record deleted successfully' });
		} else {
			res.status(400).json({ error: 'ID or warranty required' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete record' });
	}
};