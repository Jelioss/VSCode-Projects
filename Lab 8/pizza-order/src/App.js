import React from 'react';
import PizzaCard from './components/PizzaCard';
import './App.css';
import pizza1 from './assets/pizza1.jpg';
import pizza2 from './assets/pizza2.jpg';
import pizza3 from './assets/pizza3.png';

function App() {
  return (
    <div className="App">
      <h1>Заказ пиццы</h1>
      <div className="pizza-container">
        <PizzaCard
          image={pizza1}
          name="Маргарита"
        />
        <PizzaCard
          image={pizza2}
          name="Пепперони"
        />
        <PizzaCard
          image={pizza3}
          name="Четыре сыра"
        />
      </div>
    </div>
  );
}
export default App;