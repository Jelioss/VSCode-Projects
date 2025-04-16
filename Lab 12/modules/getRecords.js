const FlashDrive = require('/models/FlashDrive');

module.exports = async (req, res) => {
	try {
		const { warranty } = req.query;
		let query = {};
		if (warranty) {
			query.warranty = { $lt: Number(warranty) };
		}
		const records = await FlashDrive.find(query);
		res.json(records);
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve records' });
	}
};