import React from 'react';
import type { LetterStatus } from '../types';

interface LetterProps {
  letter: string;
  status: LetterStatus;
}

const Letter: React.FC<LetterProps> = ({ letter, status }) => {
  const statusStyles: Record<LetterStatus, React.CSSProperties> = {
    correct: { backgroundColor: '#16a34a', borderColor: '#15803d' },
    present: { backgroundColor: '#ca8a04', borderColor: '#a16207' },
    absent: { backgroundColor: '#374151', borderColor: '#1f2937' },
    empty: { backgroundColor: '#1f2937', borderColor: '#111827' },
  };

  return (
    <div
      className="flex items-center justify-center text-2xl font-bold border-2 rounded"
      style={{
        width: '56px',
        height: '56px',
        ...statusStyles[status],
      }}
    >
      {letter}
    </div>
  );
};

export default Letter;
