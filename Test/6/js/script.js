let exchangeRates = {};

document.getElementById('loadRates').addEventListener('click', async () => {
	const res = await fetch('../resource/rates.json');
	exchangeRates = await res.json();

	const fromSelect = document.getElementById('fromCurrency');
	const toSelect = document.getElementById('toCurrency');
	fromSelect.innerHTML = '';
	toSelect.innerHTML = '';

	for (let currency in exchangeRates) {
		let opt1 = new Option(currency, currency);
		let opt2 = new Option(currency, currency);
		fromSelect.appendChild(opt1);
		toSelect.appendChild(opt2);
	}

	showStatus('Курсы валют загружены.');
	showRates();
});

document.getElementById('loadInfo').addEventListener('click', async () => {
	const res = await fetch('../resource/info.txt');
	const text = await res.text();
	document.getElementById('info').textContent = text;
	document.getElementById('info').style.display = 'block';
	showStatus('Дополнительная информация загружена.');
});


document.getElementById('convert').addEventListener('click', () => {
	const amount = parseFloat(document.getElementById('amount').value);
	const from = document.getElementById('fromCurrency').value;
	const to = document.getElementById('toCurrency').value;

	if (!exchangeRates[from] || !exchangeRates[to]) {
		showStatus('Выберите валюты и загрузите курсы.', true);
		return;
	}

	const result = amount * (exchangeRates[to] / exchangeRates[from]);
	document.getElementById('result').value = result.toFixed(2);
	showStatus(`Успешный пересчёт: ${amount} ${from} → ${result.toFixed(2)} ${to}`);
});

function showRates() {
	const div = document.getElementById('rates');
	div.innerHTML = '<h3>Текущие курсы:</h3>';
	for (let key in exchangeRates) {
		div.innerHTML += `<p>${key}: ${exchangeRates[key]}</p>`;
	}
}

function loadTxtInfo() {
	fetch('/resource/info.txt')
		.then(response => {
			if (!response.ok) {
				throw new Error('Ошибка при загрузке файла');
			}
			return response.text();
		})
		.then(data => {
			const infoDiv = document.getElementById('info');
			infoDiv.textContent = data;              // ← Вставляем текст
			infoDiv.style.display = 'block';         // ← Показываем блок
			showStatus('Информация успешно загружена');
		})
		.catch(err => {
			showStatus('Ошибка загрузки информации: ' + err.message, true);
		});
}


function showStatus(message, isError = false) {
	const box = document.getElementById('status');
	box.style.display = 'block';
	box.textContent = message;

	if (isError) {
		box.classList.add('error');
	} else {
		box.classList.remove('error');
	}
}
