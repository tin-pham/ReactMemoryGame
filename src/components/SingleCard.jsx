import './SingleCard.css';

const SingleCard = ({ card, chooseCard, flipped, disabled }) => {
  function handleClick(card) {
    if (!disabled) {
      chooseCard(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={() => handleClick(card)}
          className="back"
          src="/img/cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
