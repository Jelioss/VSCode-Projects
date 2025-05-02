import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SetText = () => {
	const [min, setMin] = useState(1);
	const [max, setMax] = useState(10);
	const [text, setText] = useState('');
	const [error, setError] = useState('');
	const [texts, setTexts] = useState([]);

	useEffect(() => {
		fetchTexts();
	}, []);

	const fetchTexts = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/text');
			setTexts(response.data);
		} catch (error) {
			console.error('Error fetching texts:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const wordCount = text.trim().split(/\s+/).length;

		if (wordCount < min) {
			setError(`Необходимо ввести минимум ${min} слов`);
			return;
		}
		if (wordCount > max) {
			setError(`Необходимо ввести максимум ${max} слов`);
			return;
		}

		try {
			await axios.post('http://localhost:5000/api/text', { text });
			setError('');
			setText('');
			fetchTexts();
		} catch (error) {
			setError('Ошибка при сохранении текста');
		}
	};

	return (
		<div className="set-text-container">
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label>
						Минимальное количество слов:
						<input
							type="number"
							value={min}
							onChange={(e) => setMin(Number(e.target.value))}
							min="1"
						/>
					</label>
					<label>
						Максимальное количество слов:
						<input
							type="number"
							value={max}
							onChange={(e) => setMax(Number(e.target.value))}
							min="1"
						/>
					</label>
				</div>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Введите текст..."
					rows="4"
				/>
				{error && <div className="error">{error}</div>}
				<button type="submit">Отправить</button>
			</form>

			<div className="text-history">
				<h2>История текстов</h2>
				{texts.map((item) => (
					<div key={item._id} className="text-item">
						<p>{item.text}</p>
						<small>Слов: {item.wordCount}</small>
					</div>
				))}
			</div>
		</div>
	);
};

export default SetText;