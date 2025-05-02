class Department {
	constructor(number, name, manager, phone, employees, address) {
		this.id = number; // Используем поле "number" как ID
		this.name = name;
		this.manager = manager;
		this.phone = phone;
		this.employees = employees;
		this.address = address;
	}
}

class DepartmentManager {
	constructor() {
		this.departments = new Map(); // Храним департаменты в Map
	}

	add(department, showNotification) {
		if (this.departments.has(department.id)) {
			console.error(`Департамент с ID ${department.id} уже существует.`);
			showNotification(`Департамент с ID ${department.id} уже существует.`, 'error');
			return false; // Возвращаем false, если запись не добавлена
		}
		this.departments.set(department.id, department);
		showNotification(`Департамент с ID ${department.id} успешно добавлен!`, 'success');
		return true; // Возвращаем true, если запись добавлена
	}

	delete(id) {
		this.departments.delete(id);
	}

	getById(id) {
		return this.departments.get(id);
	}

	getAll() {
		return Array.from(this.departments.values());
	}
}



// Экземпляр класса для работы с данными
const departmentManager = new DepartmentManager();