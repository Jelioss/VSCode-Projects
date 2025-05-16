import React from 'react';

const NavigationButtons = ({ onNext, onPrev }) => {
	return (
		<div className="navigation">
			<button onClick={onPrev}>←</button>
			<button onClick={onNext}>→</button>
		</div>
	);
};

export default NavigationButtons;