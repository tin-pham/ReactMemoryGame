import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
  { src: '/img/helmet-1.png', match: false },
  { src: '/img/potion-1.png', match: false },
  { src: '/img/ring-1.png', match: false },
  { src: '/img/scroll-1.png', match: false },
  { src: '/img/shield-1.png', match: false },
  { src: '/img/sword-1.png', match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Start game automatically
  useEffect(() => {
    shuffleCard();
  }, []);

  // If card match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src == choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src == choiceOne.src) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        // Clear
        resetTurn();
      } else {
        console.log('It not match');
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  function shuffleCard() {
    let shuffledCard = [];
    shuffledCard = [...cardImages, ...cardImages]
      .sort((a, b) => Math.random() - 0.5)
      .map((card) => ({ id: Math.random(), ...card }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCard);
    setTurn(0);
  }

  function chooseCard(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card == choiceOne || card == choiceTwo || card.match}
            chooseCard={chooseCard}
            key={card.id}
            card={card}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turn}</p>
    </div>
  );
}

export default App;
