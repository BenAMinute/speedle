import React from 'react';
import Grid from './Grid';
import Keyboard from './Keyboard';
import type { Guess, LetterStatus } from '../types';
import { useState } from 'react';

interface DailyGameProps {
  onBack: () => void;
}

const DailyGame: React.FC<DailyGameProps> = ({ onBack }) => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({});
  const [targetWord] = useState('APPLE'); // This will be updated later with actual daily word logic

  const handleKeyPress = (key: string) => {
    if (key === 'ENTER') {
      if (currentGuess.length === targetWord.length) {
        const guessLetters = currentGuess.split('');
        const status: LetterStatus[] = new Array(guessLetters.length).fill('empty');
        const targetLetters = targetWord.split('');
        const usedTargetLetters = new Set<number>();

        for (let i = 0; i < guessLetters.length; i++) {
          if (guessLetters[i] === targetLetters[i]) {
            status[i] = 'correct';
            usedTargetLetters.add(i);
          }
        }

        for (let i = 0; i < guessLetters.length; i++) {
          if (status[i] !== 'correct') {
            for (let j = 0; j < targetLetters.length; j++) {
              if (!usedTargetLetters.has(j) && guessLetters[i] === targetLetters[j]) {
                status[i] = 'present';
                usedTargetLetters.add(j);
                break;
              }
            }
          }
        }

        for (let i = 0; i < guessLetters.length; i++) {
          if (status[i] === 'empty') {
            status[i] = 'absent';
          }
        }

        const newGuess: Guess = {
          letters: guessLetters,
          status: status,
        };
        setGuesses(prev => [...prev, newGuess]);
        setCurrentGuess('');
        
        const newLetterStatuses: Record<string, LetterStatus> = {};
        guessLetters.forEach((letter, index) => {
          const s = status[index];
          if (s !== 'empty') {
            newLetterStatuses[letter] = s;
          }
        });
        setLetterStatuses(newLetterStatuses);
      }
      return;
    }

    if (key === 'DELETE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (key.length === 1 && key.match(/[A-Z]/)) {
      if (currentGuess.length < targetWord.length && !currentGuess.includes(key)) {
        setCurrentGuess(prev => prev + key);
      }
    }
  };

  return (
    <div className="daily-game">
      <h1 className="title">Daily Game</h1>
      <p className="description">
        Come back every day for a new challenge!
      </p>
      <div className="daily-content">
        <div id="game-area">
          <Grid guesses={guesses} targetWordLength={targetWord.length} />
          <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
        </div>
        <button className="back-button" onClick={onBack}>Back to Home</button>
      </div>
    </div>
  );
};

export default DailyGame;