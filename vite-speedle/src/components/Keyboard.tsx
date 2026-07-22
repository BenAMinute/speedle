import React from 'react';
import type { LetterStatus } from '../types';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStatuses: Record<string, LetterStatus>;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStatuses }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ];

  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'DELETE';
            const status = letterStatuses[key];
            
            const getStatusStyles = () => {
              if (status === 'correct') return 'bg-green-600 border-green-700';
              if (status === 'present') return 'bg-yellow-600 border-yellow-700';
              if (status === 'absent') return 'bg-gray-700 border-gray-800';
              return 'bg-gray-800 border-gray-900';
            };

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`key ${isSpecial ? 'special-key' : ''} ${getStatusStyles()}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
