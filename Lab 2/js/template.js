const source = `
{{#each departments}}
<div class="department">
  <h3>{{name}}</h3>
  <p><strong>ID:</strong> {{id}}</p>
  <p><strong>ФИО менеджера:</strong> {{manager}}</p>
  <p><strong>Телефон:</strong> {{phone}}</p>
  <p><strong>Количество сотрудников:</strong> {{employees}}</p>
  <p><strong>Юр. адрес:</strong> {{address}}</p>
</div>
{{/each}}
`;

const template = Handlebars.compile(source);

function renderDepartments(departments) {
	const output = document.getElementById('output');
	output.innerHTML = ''; // Очищаем контейнер
	output.innerHTML = template({ departments }); // Передаём объект с массивом
}