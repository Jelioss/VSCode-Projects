$(document).ready(() => {
	$.getJSON('/data', (data) => {
		const sorted = data.slice().sort((a, b) => a - b);
		let html = '<table>';
		for (let i = 0; i < 10; i++) {
			html += '<tr>';
			for (let j = 0; j < 10; j++) {
				html += `<td>${sorted[i * 10 + j]}</td>`;
			}
			html += '</tr>';
		}
		html += '</table>';
		$('#table').html(html);
		$('#max-value').text(`Максимальный элемент: ${Math.max(...data)}`);
	});
});
