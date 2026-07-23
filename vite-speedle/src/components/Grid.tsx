import React from 'react';
import Letter from './Letter';
import type { Guess } from '../types';

interface GridProps {
  guesses: Guess[];
  maxGuesses?: number;
  targetWordLength: number;
}

const Grid: React.FC<GridProps> = ({ guesses, maxGuesses = 6, targetWordLength }) => {
  return (
    <div className="grid-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
      {Array.from({ length: maxGuesses }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {Array.from({ length: 5 }).map((_, letterIndex) => {
            const guess = guesses[rowIndex];
            const letter = guess?.letters[letterIndex] || '';
            const status = guess?.status[letterIndex] || 'empty';
            
            return (
              <Letter
                key={`${rowIndex}-${letterIndex}`}
                letter={letter}
                status={status}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
