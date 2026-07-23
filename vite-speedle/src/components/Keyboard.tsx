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
              if (status === 'correct') return { backgroundColor: '#16a34a', borderColor: '#15803d' };
              if (status === 'present') return { backgroundColor: '#ca8a04', borderColor: '#a16207' };
              if (status === 'absent') return { backgroundColor: '#374151', borderColor: '#1f2937' };
              return { backgroundColor: '#1f2937', borderColor: '#111827' };
            };

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                onKeyDown={(e) => {
                  if (e.key === key) {
                    e.preventDefault();
                    onKeyPress(key);
                  }
                }}
                className={`key ${isSpecial ? 'special-key' : ''}`}
                style={{
                  ...getStatusStyles(),
                  // Ensure the button is clickable and has correct layout
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  minWidth: isSpecial ? '80px' : '40px',
                  padding: '12px',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
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
