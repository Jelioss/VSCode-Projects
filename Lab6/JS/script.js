// Создаем Map для хранения цен товаров
const pricesMap = new Map();

// Функция генерации случайной цены
const generateRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

// Создание начальных данных
const initializePrices = () => {
   const products = Array.from({length: 30}, (_, i) => `Товар ${i + 1}`);
   const dates = Array.from({length: 31}, (_, i) => `${i + 1}`);
   
   products.forEach(product => {
      const productPrices = new Map();
      dates.forEach(date => {
            productPrices.set(date, generateRandomPrice());
      });
      pricesMap.set(product, productPrices);
   });
};

// Функция замыкания для пересчета цен
const createPriceCalculator = (coefficient) => {
   return function(price, isIncrease) {
      return isIncrease ? 
            Math.round(price * coefficient) : 
            Math.round(price / coefficient);
   };
};

// Функция обновления таблицы
const updateTable = function() {
   const table = document.getElementById('priceTable');
   table.innerHTML = '';
   
    // Создаем заголовок таблицы
   const headerRow = document.createElement('tr');
   headerRow.innerHTML = '<th>Товар/Дата</th>' + 
      Array.from(pricesMap.get('Товар 1').keys())
            .map(date => `<th>День ${date}</th>`)
            .join('');
	table.appendChild(headerRow);

    // Заполняем данные
   pricesMap.forEach((prices, product) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${product}</td>` +
            Array.from(prices.values())
               .map(price => `<td>${price}р.</td>`)
               .join('');
      table.appendChild(row);
   });
};

// Инициализация дат в выпадающем списке
const initializeDateSelect = () => {
   const dateSelect = document.getElementById('dateSelect');
   Array.from(pricesMap.get('Товар 1').keys()).forEach(date => {
      const option = document.createElement('option');
      option.value = date;
      option.textContent = date;
      dateSelect.appendChild(option);
   });
};

// Обработчик пересчета цен
const recalculatePrices = function() {
   const coefficient = parseFloat(document.getElementById('coefficientSelect').value);
   const selectedDate = document.getElementById('dateSelect').value;
   const isIncrease = document.getElementById('increase').checked;
   
   const calculator = createPriceCalculator(coefficient);

   pricesMap.forEach((prices, product) => {
      const newPrice = calculator(prices.get(selectedDate), isIncrease);
      prices.set(selectedDate, newPrice);
   });

   updateTable();
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
   initializePrices();
   initializeDateSelect();
   updateTable();
   
   document.getElementById('recalculateBtn')
      .addEventListener('click', recalculatePrices.bind(null));
});
