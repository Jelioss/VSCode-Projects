import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationButtons from './NavigationButtons';
import Counter from './Counter';

const ProductGallery = () => {
	const [products, setProducts] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [sizeIndex, setSizeIndex] = useState(0); // 0: 100%, 1: 50%, 2: 33.33%, 3: 25%

	const sizes = [1, 0.5, 0.3333, 0.25]; // Масштабы для изображения

	useEffect(() => {
		axios.get('/api/products')
			.then(response => setProducts(response.data))
			.catch(error => console.error('Ошибка загрузки данных:', error));
	}, []);

	const handleNext = () => {
		if (currentIndex < products.length - 1) {
			setCurrentIndex(prev => prev + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(prev => prev - 1);
		}
	};

	const handleIncrease = () => {
		if (sizeIndex > 0) {
			setSizeIndex(prev => prev - 1);
		}
	};

	const handleDecrease = () => {
		if (sizeIndex < sizes.length - 1) {
			setSizeIndex(prev => prev + 1);
		}
	};

	if (products.length === 0) return <div>Загрузка...</div>;

	const currentProduct = products[currentIndex];
	const currentSize = sizes[sizeIndex];

	return (
		<div className="gallery">
			<img
				src={currentProduct.image}
				alt={currentProduct.name}
				className="product-image"
				style={{ transform: `scale(${currentSize})` }}
			/>
			<p>{currentProduct.name}</p>
			<Counter current={currentIndex + 1} total={products.length} />
			<div className="size-buttons">
				<button onClick={handleIncrease}>Увеличить</button>
				<button onClick={handleDecrease}>Уменьшить</button>
			</div>
			<NavigationButtons onNext={handleNext} onPrev={handlePrev} />
		</div>
	);
};

export default ProductGallery;