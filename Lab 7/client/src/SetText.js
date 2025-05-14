import React, { useState } from 'react';
import './SetText.css';

const SetText = () => {
	const [minWords, setMinWords] = useState('');
	const [maxWords, setMaxWords] = useState('');
	const [text, setText] = useState('');
	const [message, setMessage] = useState('');

	const handleCheck = () => {
		const words = text.trim().split(/\s+/).filter(word => word.length > 0);
		const uniqueWords = new Set(words);
		const wordCount = words.length;

		const min = parseInt(minWords, 10) || 0;
		const max = parseInt(maxWords, 10) || Infinity;

		if (wordCount >= min && wordCount <= max) {
			setMessage(`Текст принят! Слов: ${wordCount}, уникальных: ${uniqueWords.size}`);
		} else {
			setMessage(`Ошибка! Слов: ${wordCount}. Должно быть от ${min} до ${max} слов.`);
		}
	};

	return (
		<div>
			<div>
				<label>Минимальное количество слов: </label>
				<input
					type="number"
					value={minWords}
					onChange={(e) => setMinWords(e.target.value)}
				/>
			</div>
			<div>
				<label>Максимальное количество слов: </label>
				<input
					type="number"
					value={maxWords}
					onChange={(e) => setMaxWords(e.target.value)}
				/>
			</div>
			<div>
				<label>Введите текст: </label>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows="4"
					cols="50"
				/>
			</div>
			<button onClick={handleCheck}>Проверить</button>
			<p>{message}</p>
		</div>
	);
};

export default SetText;