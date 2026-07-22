import React from 'react';
import type { LetterStatus } from '../types';

interface LetterProps {
  letter: string;
  status: LetterStatus;
}

const Letter: React.FC<LetterProps> = ({ letter, status }) => {
  const statusStyles: Record<LetterStatus, string> = {
    correct: 'bg-green-600 border-green-700',
    present: 'bg-yellow-600 border-yellow-700',
    absent: 'bg-gray-700 border-gray-800',
    empty: 'bg-gray-800 border-gray-900',
  };

  return (
    <div className={`w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 rounded ${statusStyles[status]}`}>
      {letter}
    </div>
  );
};

export default Letter;
