const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const textRoutes = require('./server/routes/text');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/textdb', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use('/api/text', textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));