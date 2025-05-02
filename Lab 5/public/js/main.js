document.getElementById('filterForm').addEventListener('submit', async function (e) {
	e.preventDefault();
	const warranty = document.getElementById('warrantyInput').value;

	try {
		const response = await fetch(`/api/filter-by-warranty/${warranty}`);
		const data = await response.json();

		if (data.length === 0) {
			document.getElementById('result').innerHTML = "<p>Нет подходящих производителей.</p>";
		} else {
			document.getElementById('result').innerHTML = `<h3>Производители с гарантией менее ${warranty} месяцев:</h3><ul>${data.map(m => `<li>${m}</li>`).join('')}</ul>`;
		}
	} catch (err) {
		console.error("Ошибка при обработке данных:", err);
	}
});