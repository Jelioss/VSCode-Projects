const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost/usbFlashDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err));

// Import Modules
const addRecord = require('./modules/addRecord');
const deleteRecord = require('./modules/deleteRecord');
const updateRecord = require('./modules/updateRecord');
const getRecords = require('./modules/getRecords');

// Routes
app.post('/api/flash/add', addRecord);
app.delete('/api/flash/delete/:id', deleteRecord);
app.put('/api/flash/update/:id', updateRecord);
app.get('/api/flash', getRecords);

// Serve HTML
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));