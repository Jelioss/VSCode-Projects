document.getElementById('filterForm').addEventListener('submit', async function (e) {
	e.preventDefault();
	const filterValue = document.getElementById('employeeFilter').value;

	if (isNaN(filterValue)) {
		alert("Введите число");
		return;
	}

	try {
		const response = await fetch(`/api/filter-by-employees/${filterValue}`);
		const data = await response.json();

		const resultDiv = document.getElementById('result');
		if (data.length === 0) {
			resultDiv.innerHTML = "<p>Нет подходящих организаций.</p>";
		} else {
			let html = `<ul>`;
			data.forEach(org => {
				html += `
						<li>
							<strong>${org.name}</strong><br>
							Тип: ${org.isProduction ? "Производственная" : "Не производственная"}<br>
							Сотрудников: ${org.employees}<br>
							Зарплата: ${org.averageSalary.toFixed(2)} $
						</li>
					`;
			});
			html += `</ul>`;
			resultDiv.innerHTML = html;
		}
	} catch (err) {
		console.error(err);
		document.getElementById('result').innerHTML = "<p>Ошибка при загрузке данных.</p>";
	}
});