$(document).ready(() => {
	// Функция для показа уведомлений
	const showNotification = (message, type) => {
		const $notification = $('#notification');
		$notification.text(message)
			.removeClass('hidden success error')
			.addClass(`${type} show`);
		setTimeout(() => {
			$notification.removeClass('show').addClass('hidden');
		}, 3000);
	};

	// Сохранение данных в XML
	$('#inputForm').on('submit', (e) => {
		e.preventDefault();
		const formData = {
			textArea: $('#textAreaInput').val(),
			dataList: $('#dataListInput').val(),
			email: $('#emailInput').val(),
			checkbox1: $('#checkbox1Input').is(':checked'),
			checkbox2: $('#checkbox2Input').is(':checked')
		};

		$.ajax({
			url: '/save-xml',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: (response) => {
				console.log('Успешно сохранено:', response);
				showNotification('Данные сохранены в XML!', 'success');
				$('#inputForm')[0].reset();
			},
			error: (xhr, status, error) => {
				console.error('Ошибка сохранения:', status, error);
				showNotification('Ошибка сохранения данных', 'error');
			}
		});
	});

	// Чтение данных из XML и заполнение второй формы
	$('#loadButton').on('click', () => {
		$.ajax({
			url: '/load-xml',
			type: 'GET',
			dataType: 'json',
			success: (data) => {
				console.log('Данные загружены:', data);
				$('#textAreaDisplay').val(data.textArea || '');
				$('#dataListDisplay').val(data.dataList || '');
				$('#emailDisplay').val(data.email || '');
				$('#checkbox1Display').prop('checked', data.checkbox1 || false);
				$('#checkbox2Display').prop('checked', data.checkbox2 || false);
				showNotification('Данные загружены из XML!', 'success');
			},
			error: (xhr, status, error) => {
				console.error('Ошибка загрузки:', status, error);
				showNotification('Ошибка загрузки данных', 'error');
			}
		});
	});
});