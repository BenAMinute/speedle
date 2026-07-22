import React from 'react';

interface DailyGameProps {
  onBack: () => void;
}

const DailyGame: React.FC<DailyGameProps> = ({ onBack }) => {
  return (
    <div className="daily-game">
      <h1 className="title">Daily Game</h1>
      <p className="description">
        Come back every day for a new challenge!
      </p>
      <div className="daily-content">
        <p>The daily word will be revealed here.</p>
        <button className="back-button" onClick={onBack}>Back to Home</button>
      </div>
    </div>
  );
};

export default DailyGame;