document.addEventListener('DOMContentLoaded', () => {
	const tableContainer = document.getElementById('table-container');
	const sortAscButton = document.getElementById('sort-asc');
	const sortDescButton = document.getElementById('sort-desc');
	const decimalCheckbox = document.getElementById('decimal-checkbox');

	function createTable(data) {
		console.log('Создание таблицы с данными:', data);
		const rows = Math.ceil(data.length / 10);
		let tableHTML = '<table border="1">';
		for (let i = 0; i < rows; i++) {
			tableHTML += '<tr>';
			for (let j = 0; j < 10; j++) {
				const index = i * 10 + j;
				if (index < data.length) {
					const value = decimalCheckbox.checked
						? parseFloat(data[index]).toFixed(2)
						: Math.round(data[index]);
					tableHTML += `<td>${value}</td>`;
				} else {
					tableHTML += '<td></td>';
				}
			}
			tableHTML += '</tr>';
		}
		tableHTML += '</table>';
		tableContainer.innerHTML = tableHTML;
	}

	// Загрузка исходных данных
	fetch('/get-before')
		.then(response => response.json())
		.then(data => createTable(data));

	// Обработка сортировки
	function handleSort(order) {
		fetch('/sort', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ order })
		})
			.then(response => response.json())
			.then(data => createTable(data));
	}

	sortAscButton.addEventListener('click', () => handleSort('asc'));
	sortDescButton.addEventListener('click', () => handleSort('desc'));
});