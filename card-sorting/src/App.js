import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Initial card data and original order
  const originalCards = [5, 3, 0, 2, 1, 4];
  const [cards, setCards] = useState([...originalCards]);
  const [isSorting, setIsSorting] = useState(false);
  const [order, setOrder] = useState(originalCards.map((_, index) => index)); // Track the position of cards

  // Sorting logic with animation
  const sortAsc = () => {
    setIsSorting(true);
    const sortedCards = [...cards].sort((a, b) => a - b);
    animateShuffle(sortedCards);
  };

  const sortDesc = () => {
    setIsSorting(true);
    const sortedCards = [...cards].sort((a, b) => b - a);
    animateShuffle(sortedCards);
  };

  const resetOriginal = () => {
    setIsSorting(true);
    animateShuffle([...originalCards]);
  };

  // Function to animate shuffle by updating card order
  const animateShuffle = (newCards) => {
    const newOrder = newCards.map(card => cards.indexOf(card)); // Find the new index for each card
    setOrder(newOrder);
    setTimeout(() => {
      setCards(newCards);  // Set cards in new sorted order after animation
      setIsSorting(false);
    }, 500);  // Animation duration matches CSS transition
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={sortAsc} disabled={isSorting}>Sort Ascending</button>
        <button onClick={sortDesc} disabled={isSorting}>Sort Descending</button>
        <button onClick={resetOriginal} disabled={isSorting}>Reset to Original</button>
      </div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${isSorting ? 'shuffling' : ''}`}
            style={{ transform: `translateX(${order[index] * 120}px)` }}  // Position card based on order
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
