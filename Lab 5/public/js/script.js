document.addEventListener('DOMContentLoaded', () => {
	// Добавление записи
	document.getElementById('addForm').addEventListener('submit', async (e) => {
		e.preventDefault();
		const manufacturer = document.getElementById('manufacturer').value;
		const capacity = document.getElementById('capacity').value;
		const warranty = document.getElementById('warranty').value;
		const stock = document.getElementById('stock').value;

		const response = await fetch('/api/flash/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ manufacturer, capacity, warranty, stock })
		});

		if (response.ok) {
			alert('Flash Drive Added!');
			document.getElementById('addForm').reset();
			getRecords();
		} else {
			alert('Error adding flash drive');
		}
	});

	// Получение записей
	window.getRecords = async () => {
		const warranty = document.getElementById('warrantyFilter').value || '';
		const response = await fetch(`/api/flash?warranty=${warranty}`, {
			method: 'GET', // точно GET
			headers: { 'Content-Type': 'application/json' }
		});
		const records = await response.json();
		const tbody = document.getElementById('recordsBody');
		tbody.innerHTML = '';
		records.forEach(record => {
			const row = document.createElement('tr');
			row.innerHTML = `
					<td>${record._id}</td>
					<td>${record.manufacturer}</td>
					<td>${record.capacity}</td>
					<td>${record.warranty}</td>
					<td>${record.stock}</td>
					<td><button onclick="editRecord('${record._id}')">Edit</button></td>
			  `;
			tbody.appendChild(row);
		});
	};

	// Удаление по гарантии
	window.deleteByWarranty = async () => {
		const warranty = document.getElementById('warrantyDelete').value;
		if (warranty) {
			await fetch(`/api/flash/delete/${warranty}`, { method: 'DELETE' });
			getRecords();
		}
	};
});

window.editRecord = (id) => {
	console.log('Edit', id);
};