// Меню
const menu = document.getElementById("menu");
const colors = ["red", "blue", "green", "yellow", "purple"]; // Цвета для выбора
let modal = null;

// Инициализация меню
const menuItems = ["Главная", "О проекте", "Контакты"];
menuItems.forEach((item) => addMenuItem(item));

// Создать меню
function addMenuItem(name, color = null) {
   const link = document.createElement("a");
   link.textContent = name;
   link.href = "#";
   link.style.color = color || "white";
   link.onclick = () => openWindow(name);
   menu.appendChild(link);
}

// Открыть новое окно
function openWindow(name) {
   alert(`Вы выбрали: ${name}`);
}

// Модальное окно
function showModal(content) {
   if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
            <p>${content}</p>
            <button onclick="closeModal()">Закрыть</button>
      `;
      document.body.appendChild(modal);
   }
   modal.querySelector("p").textContent = content;
   modal.classList.add("active");
}

// Закрыть модальное окно
function closeModal() {
   modal.classList.remove("active");
}

// Кнопка добавления меню
document.addEventListener("DOMContentLoaded", () => {
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
