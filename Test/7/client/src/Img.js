import React, { useState } from 'react';
import './Img.css';

const Img = ({ images }) => {
	const [visibleCount, setVisibleCount] = useState(2); // Начинаем с 2 картинок

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 2); // Показываем ещё 2
	};

	const visibleImages = images.slice(0, visibleCount);
	console.log('Rendering images:', visibleImages); // Отладка

	return (
		<div className="img-container">
			<div className="images">
				{visibleImages.map((image, index) => (
					// eslint-disable-next-line jsx-a11y/img-redundant-alt
					<img
						key={index}
						src={image}
						alt={`Nature scene ${index + 1}`}
						className="image"
					/>
				))}
			</div>
			{visibleCount < images.length && (
				<button onClick={handleShowMore} className="show-more">
					Показать ещё
				</button>
			)}
		</div>
	);
};

export default Img;