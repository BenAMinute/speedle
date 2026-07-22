export type GameMode = 'easy' | 'medium' | 'hard';

export interface GameModeConfig {
  mode: GameMode;
  timeLimit: number; // in seconds
}

export const GameModeConfigs: Record<GameMode, GameModeConfig> = {
  easy: { mode: 'easy', timeLimit: 90 },
  medium: { mode: 'medium', timeLimit: 60 },
  hard: { mode: 'hard', timeLimit: 30 },
};

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface Guess {
  letters: string[];
  status: LetterStatus[];
}

export interface Word {
  word: string;
  id: string;
}

export type GameStatus = 'playing' | 'won' | 'lost' | 'gameOver';

export type GameState = 'welcome' | 'playing' | 'won' | 'lost' | 'summary';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  highScores: Record<GameMode, number>;
}

export interface HighScore {
  mode: GameMode;
  score: number;
  timestamp: number;
}
