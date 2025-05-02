const FlashDrive = require('../models/flashDrive');

const getRecords = async (req, res) => {
	try {
		const warranty = req.query.warranty ? parseInt(req.query.warranty) : null;
		const query = warranty ? { warranty: { $lt: warranty } } : {};
		const records = await FlashDrive.find(query);
		res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
		res.json(records);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = getRecords;