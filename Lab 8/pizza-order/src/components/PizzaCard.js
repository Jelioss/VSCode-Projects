import React, { useState } from 'react';
import styles from './PizzaCard.module.css';

function PizzaCard({ image, name }) {
	const [count, setCount] = useState(0);
	const [clicks, setClicks] = useState(0);

	const handleClick = () => {
		if (clicks + 1 >= 10) {
			setCount(0);
			setClicks(0);
		} else {
			setCount(count + 1);
			setClicks(clicks + 1);
		}
	};

	return (
		<div className={styles.card}>
			<img src={image} alt={name} className={styles.image} onClick={handleClick} />
			<h2>{name}</h2>
			<p>Количество: {count}</p>
		</div>
	);
}

export default PizzaCard;