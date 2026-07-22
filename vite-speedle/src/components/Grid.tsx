import React from 'react';
import Letter from './Letter';
import type { Guess } from '../types';

interface GridProps {
  guesses: Guess[];
  maxGuesses?: number;
}

const Grid: React.FC<GridProps> = ({ guesses, maxGuesses = 6 }) => {
  return (
    <div className="grid grid-rows-6 gap-2 p-4">
      {Array.from({ length: maxGuesses }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {guesses[rowIndex]?.letters.map((letter, letterIndex) => (
            <Letter
              key={letterIndex}
              letter={letter}
              status={guesses[rowIndex]?.status[letterIndex] || 'empty'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
