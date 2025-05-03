document.addEventListener("DOMContentLoaded", function () {
	const list = document.getElementById("wordsList");

	// Получение пути к файлу
	const filePath = window.location.pathname.includes("original")
		? "../resources/data/original.json"
		: "../resources/data/processed.json";

	// Чтение файла
	fetch(filePath)
		.then(response => response.json())
		.then(data => {
			data.forEach(word => {
				const li = document.createElement("li");
				li.textContent = word;
				list.appendChild(li);
			});
		})
		.catch(err => {
			console.error("Ошибка чтения файла:", err);
		});
});