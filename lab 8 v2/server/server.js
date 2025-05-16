const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

const products = new Map([
	[1, { id: 1, name: 'Товар 1', image: '/images/product1.jpg' }],
	[2, { id: 2, name: 'Товар 2', image: '/images/product2.jpg' }],
	[3, { id: 3, name: 'Товар 3', image: '/images/product3.jpg' }],
	[4, { id: 4, name: 'Товар 4', image: '/images/product4.jpg' }],
	[5, { id: 5, name: 'Товар 5', image: '/images/product5.jpg' }],
	[6, { id: 6, name: 'Товар 6', image: '/images/product6.jpg' }],
	[7, { id: 7, name: 'Товар 7', image: '/images/product7.jpg' }],
	[8, { id: 8, name: 'Товар 8', image: '/images/product8.jpg' }],
	[9, { id: 9, name: 'Товар 9', image: '/images/product9.jpg' }],
	[10, { id: 10, name: 'Товар 10', image: '/images/product10.jpg' }]
]);

app.get('/api/products', (req, res) => {
	const productsArray = Array.from(products.values());
	res.json(productsArray);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));