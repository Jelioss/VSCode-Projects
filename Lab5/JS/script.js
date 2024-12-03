// Меню
const menu = document.getElementById("menu");
const colors = ["red", "blue", "green", "yellow", "purple"]; // Цвета для выбора
let modal = null; // Переменная для модального окна

// Создать модальное окно
function createModal() {
   modal = document.createElement("div");
   modal.classList.add("modal");

   const content = document.createElement("p");
   content.id = "modal-content";
   modal.appendChild(content);

   const closeButton = document.createElement("button");
   closeButton.textContent = "Закрыть";
   closeButton.onclick = closeModal;

   modal.appendChild(closeButton);
   document.body.appendChild(modal);
}

function closeModal() {
   modal.classList.remove("active");
   setTimeout(() => {
      modal.style.display = "none"; // Скрытие окна после завершения анимации
   }, 300); // время анимации
}

// Инициализация меню
const menuItems = ["Главная", "О проекте", "Контакты"];
menuItems.forEach((item) => addMenuItem(item));

// Создать меню
function addMenuItem(name, color = null) {
   const link = document.createElement("a");
   link.textContent = name;
   link.href = "#";
   link.style.color = color || "white";
   link.onclick = (e) => {
      e.preventDefault();
      openWindow(name);
   };
   menu.appendChild(link);
}

// Открыть модальное окно
function openWindow(name) {
   const modalContent = document.getElementById("modal-content");
   modalContent.textContent = `Вы выбрали: ${name}`;
   modal.style.display = "block"; // Устанавливаем display для плавного появления
   setTimeout(() => {
      modal.classList.add("active");
   }, 10); // Задержка для корректного срабатывания анимации
}

// Закрыть модальное окно
function closeModal() {
   modal.classList.remove("active");
}

// Добавить модальное окно и кнопку добавления пунктов меню
document.addEventListener("DOMContentLoaded", () => {
   createModal(); // Создаем модальное окно при загрузке страницы

   const inputField = document.createElement("input");
   inputField.type = "text";
   inputField.placeholder = "Введите название пункта";

   const select = document.createElement("select");
   colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
   });

   const button = document.createElement("button");
   button.textContent = "Добавить пункт";
   button.onclick = () => {
      const text = inputField.value.trim();
      const color = select.value;
      if (text) {
         addMenuItem(text, color);
         inputField.value = "";
      } else {
         alert("Введите название пункта.");
      }
   };

   const container = document.createElement("div");
   container.appendChild(inputField);
   container.appendChild(select);
   container.appendChild(button);

   document.body.insertBefore(container, document.querySelector("article"));
});
