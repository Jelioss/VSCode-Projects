$(document).ready(() => {
	const tableContainer = $('#table');
	const maxValueSpan = $('#max-value');
	const decimalCheckbox = $('#decimal-checkbox');

	let dataArray = [];

	// Функция для создания таблицы
	function createTable(data) {
		let html = '<table border="1">';
		for (let i = 0; i < 10; i++) {
			html += '<tr>';
			for (let j = 0; j < 10; j++) {
				const index = i * 10 + j;
				if (index < data.length) {
					const value = decimalCheckbox.is(':checked')
						? parseFloat(data[index]).toFixed(2)
						: Math.round(data[index]);
					html += `<td>${value}</td>`;
				} else {
					html += '<td></td>';
				}
			}
			html += '</tr>';
		}
		html += '</table>';
		tableContainer.html(html);
	}

	// Загрузка исходных данных
	$.getJSON('/get-data', (data) => {
		dataArray = data.map(Number); // Преобразуем строки в числа
		createTable(dataArray);
		maxValueSpan.text(`Максимальный элемент: ${Math.max(...dataArray)}`);
	});

	// Обработка сортировки по возрастанию
	$('#sort-asc').click(() => {
		$.post('/sort', JSON.stringify({ order: 'asc' }), (result) => {
			createTable(result.sortedArray);
		}, 'json');
	});

	// Обработка сортировки по убыванию
	$('#sort-desc').click(() => {
		$.post('/sort', JSON.stringify({ order: 'desc' }), (result) => {
			createTable(result.sortedArray);
		}, 'json');
	});
});