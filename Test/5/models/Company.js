const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	name: { type: String, required: true },
	isProduction: { type: Boolean, default: false },
	employees: { type: Number, required: true },
	averageSalary: { type: Number, required: true }
});

module.exports = mongoose.model('Company', CompanySchema);