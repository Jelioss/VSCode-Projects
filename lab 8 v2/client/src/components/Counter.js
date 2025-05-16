import React from 'react';

const Counter = ({ current, total }) => {
	return (
		<div className="counter">
			Товар {current} из {total}
		</div>
	);
};

export default Counter;