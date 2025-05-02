document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('filterForm');
	const resultDiv = document.getElementById('result');

	if (!form || !resultDiv) {
		console.error("Не найдены элементы DOM для формы или результата.");
		return;
	}

	form.addEventListener('submit', async function (e) {
		e.preventDefault();

		const warrantyInput = document.getElementById('warrantyInput');
		if (!warrantyInput || !warrantyInput.value) {
			alert("Введите число");
			return;
		}

		const warranty = warrantyInput.value.trim();
		if (isNaN(warranty)) {
			alert("Введите число");
			return;
		}

		try {
			const response = await fetch(`/api/filter-by-warranty/${warranty}`);
			if (!response.ok) {
				throw new Error("Ошибка при запросе");
			}

			const data = await response.json();

			if (data.length === 0) {
				resultDiv.innerHTML = "<p>Нет подходящих производителей.</p>";
			} else {
				resultDiv.innerHTML = `
						<h3>Производители с гарантией менее ${warranty} месяцев:</h3>
						<ul>${data.map(m => `<li>${m}</li>`).join('')}</ul>
					`;
			}
		} catch (err) {
			console.error(err);
			resultDiv.innerHTML = "<p>Ошибка при загрузке данных.</p>";
		}
	});
});