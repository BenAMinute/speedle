import React from 'react';

interface WelcomeScreenProps {
  onStartDaily: (mode: 'easy' | 'medium' | 'hard') => void;
  onStartPractice: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartDaily, onStartPractice }) => {
  return (
    <div className="welcome-screen">
      <h1 className="title">Speedle</h1>
      <p className="description">
        A fast-paced Wordle clone. Guess the word before the timer runs out!
      </p>
      <div className="tutorial">
        <p>1. Type a 5-letter word.</p>
        <p>2. Watch the colors: Green for correct, Yellow for present, Gray for absent.</p>
        <p>3. Beat the clock!</p>
      </div>

      <div className="game-categories">
        <div className="category">
          <h3 className="category-title">Daily Games</h3>
          <div className="button-group">
            <button onClick={() => onStartDaily('easy')}>Easy</button>
            <button onClick={() => onStartDaily('medium')}>Medium</button>
            <button onClick={() => onStartDaily('hard')}>Hard</button>
          </div>
        </div>

        <div className="category">
          <h3 className="category-title">Practice</h3>
          <div className="button-group">
            <button onClick={onStartPractice}>Practice Mode</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;