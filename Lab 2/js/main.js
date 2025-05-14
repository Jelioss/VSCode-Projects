document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('departmentForm');
	const clearFormButton = document.getElementById('clearForm');
	const deleteByIdButton = document.getElementById('deleteById');
	const showAllButton = document.getElementById('showAll');
	const showByIdButton = document.getElementById('showById');
	const idInput = document.getElementById('idInput');

	function showNotification(message, type = 'success') {
		const notificationsContainer = document.getElementById('notifications');
		if (!notificationsContainer) {
			console.error('Контейнер для уведомлений не найден!');
			return;
		}

		// Создаем элемент уведомления
		const notification = document.createElement('div');
		notification.classList.add('notification', type);
		notification.innerHTML = `
		<span>${message}</span>
		<button>&times;</button>
		`;

		// Добавляем уведомление на страницу
		notificationsContainer.appendChild(notification);

		// Автоматически удаляем уведомление через 3 секунды
		setTimeout(() => {
			notification.remove();
		}, 3000);

		// Удаляем уведомление при нажатии на кнопку
		notification.querySelector('button').addEventListener('click', () => {
			notification.remove();
		});
	}

	// Функция для проверки числовых полей
	function validateNumber(value, fieldName) {
		if (isNaN(value) || value.trim() === "") {
			showNotification(`Поле "${fieldName}" должно содержать только числа.`, 'error');
			return false;
		}
		return true;
	}

	// Функция для проверки текстовых полей
	function validateText(value, fieldName) {
		const regex = /^[a-zA-Zа-яА-Я\s]+$/; // Разрешаем только буквы и пробелы
		if (!regex.test(value)) {
			showNotification(`Поле "${fieldName}" содержит недопустимые символы.`, 'error');
			return false;
		}
		return true;
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(form);

		const number = formData.get('number');
		const name = formData.get('name');
		const manager = formData.get('manager');
		const phone = formData.get('phone');
		const employees = formData.get('employees');
		const address = formData.get('address');

		// Валидация полей
		if (!validateNumber(number, "Номер")) return;
		if (!validateText(name, "Название")) return;
		if (!validateText(manager, "ФИО менеджера")) return;
		if (!validateNumber(phone, "Телефон")) return;
		if (!validateNumber(employees, "Количество сотрудников") || employees <= 0) {
			showNotification("Количество сотрудников должно быть положительным числом.", 'error');
			return;
		}

		// Создаем объект департамента
		const department = new Department(
			number,
			name,
			manager,
			phone,
			employees,
			address
		);

		// Добавляем департамент
		const isAdded = departmentManager.add(department, showNotification); // Передаем showNotification
		if (isAdded) {
			form.reset(); // Очищаем форму только при успешном добавлении
		}
	});

	// Очистка формы
	clearFormButton.addEventListener('click', () => {
		form.reset();
	});

	// Удаление записи по ID
	deleteByIdButton.addEventListener('click', () => {
		const id = idInput.value.trim(); // Получаем ID из поля ввода
		if (departmentManager.getById(id)) {
			departmentManager.delete(id);
			showNotification(`Запись с ID ${id} успешно удалена!`, 'success');
			renderDepartments(departmentManager.getAll()); // Обновляем вывод данных
		} else {
			showNotification(`Запись с ID ${id} не найдена.`, 'error');
		}
	});

	// Показать все данные
	showAllButton.addEventListener('click', () => {
		const allDepartments = departmentManager.getAll();
		renderDepartments(allDepartments);
	});

	// Показать запись по ID
	showByIdButton.addEventListener('click', () => {
		const id = idInput.value.trim(); // Получаем ID из поля ввода
		const department = departmentManager.getById(id);
		if (department) {
			renderDepartments([department]); // Отображаем только одну запись
			showNotification(`Запись с ID ${id} успешно найдена!`, 'success');
		} else {
			showNotification(`Запись с ID ${id} не найдена.`, 'error');
		}
	});
});