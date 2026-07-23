import './App.css'
import { GameModeConfigs } from './types'
import type { GameMode } from './types'
import Grid from './components/Grid'
import Keyboard from './components/Keyboard'
import WelcomeScreen from './components/WelcomeScreen'
import DailyGame from './components/DailyGame'
import { useState, useEffect, useRef } from 'react'
import type { Guess, LetterStatus } from './types'

const WORD_LIST = ['APPLE', 'BEACH', 'CLOUD', 'DANCE', 'EARTH', 'FLAME', 'GRAPE', 'HOUSE', 'INDEX', 'JUICE', 'KNIFE', 'LIGHT', 'MELON', 'NIGHT', 'OCEAN', 'PIANO', 'QUEEN', 'RIVER', 'SPACE', 'TIGER', 'UNDER', 'VOICE', 'WATER', 'YOUTH', 'ZEBRA'];

function App() {
  const [targetWord, setTargetWord] = useState(WORD_LIST[0]);
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [targetWordLength, setTargetWordLength] = useState(6);
  const [currentGuess, setCurrentGuess] = useState('')
  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({})
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'won' | 'lost' | 'summary' | 'daily'>('welcome')
  
  const [timeLeft, setTimeLeft] = useState(90);
  const [selectedMode, setSelectedMode] = useState<GameMode>('easy');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [totalWordsCompleted, setTotalWordsCompleted] = useState(0);
  const [finalTime, setFinalTime] = useState(0);


  const startGame = () => {
    setGameState('playing');
    setGuesses([]);
    setCurrentGuess('');
    setLetterStatuses({});
    setGameStatus('playing');
    setTimeLeft(GameModeConfigs[selectedMode as keyof typeof GameModeConfigs].timeLimit);
    const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(newWord);
    setTargetWordLength(newWord.length);
  };

  const nextWord = () => {
    const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(newWord);
    setTargetWordLength(newWord.length);
    setGuesses([]);
    setCurrentGuess('');
    setLetterStatuses({});
  };

  useEffect(() => {
    if (gameState === 'playing' && gameStatus === 'won') {
      // Small delay before moving to next word to let the user see the "correct" status
      const timer = setTimeout(() => {
        nextWord();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length === targetWordLength) {
        const guessLetters = currentGuess.split('')
        const status: LetterStatus[] = new Array(guessLetters.length).fill('empty')
        
        const targetLetters = targetWord.split('')
        const usedTargetLetters = new Set<number>()

        // First pass: find correct positions
        for (let i = 0; i < guessLetters.length; i++) {
          if (guessLetters[i] === targetLetters[i]) {
            status[i] = 'correct'
            usedTargetLetters.add(i)
          }
        }

        // Second pass: find present letters
        for (let i = 0; i < guessLetters.length; i++) {
          if (status[i] !== 'correct') {
            for (let j = 0; j < targetLetters.length; j++) {
              if (!usedTargetLetters.has(j) && guessLetters[i] === targetLetters[j]) {
                status[i] = 'present'
                usedTargetLetters.add(j)
                break
              }
            }
          }
        }

        // Third pass: mark absent letters
        for (let i = 0; i < guessLetters.length; i++) {
          if (status[i] === 'empty') {
            status[i] = 'absent'
          }
        }

        const newGuess: Guess = {
          letters: guessLetters,
          status: status,
        }
        const newGuesses = [...guesses, newGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');
        
        if (status.every(s => s === 'correct')) {
          setGameStatus('won');
          setTotalWordsCompleted(prev => prev + 1);
          // Keep state in 'playing' for successful rounds during timed session
          // The nextWord logic is handled by the useEffect that watches gameStatus === 'won'
        } else if (newGuesses.length >= 6) {
          setGameStatus('lost');
          // Do NOT setGameState('lost') here. 
          // Only setGameState('lost') when the timer runs out.
          nextWord(); // Reset to a new word so the user can keep playing
        }
      }
      return
    }

    if (key === 'DELETE') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

        if (key.length === 1 && key.match(/[A-Z]/)) {
      if (currentGuess.length < targetWordLength) {
        const newGuessStr = currentGuess + key;
        setCurrentGuess(newGuessStr);
        
        if (guesses.length > 0) {
          const newGuesses = [...guesses];
          const lastGuess = newGuesses[newGuesses.length - 1];
          
          if (lastGuess && lastGuess.letters.length === targetWordLength) {
            newGuesses.push({
              letters: newGuessStr.split(''),
              status: new Array(newGuessStr.length).fill('empty'),
            });
          } else {
            newGuesses[newGuesses.length - 1] = {
              letters: newGuessStr.split(''),
              status: new Array(newGuessStr.length).fill('empty'),
            };
          }
          setGuesses(newGuesses);
        } else {
          setGuesses([{
            letters: newGuessStr.split(''),
            status: new Array(newGuessStr.length).fill('empty'),
          }]);
        }
      }
    }

  }

  useEffect(() => {
    if (gameState === 'playing' && gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameStatus('lost');
            setGameState('lost');
            setFinalTime(prev);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, gameStatus, selectedMode]);

  useEffect(() => {
    if (gameState === 'playing') {
      const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toUpperCase();
        
        if (key === 'ENTER') {
          e.preventDefault();
          handleKeyPress('ENTER');
        } else if (key === 'BACKSPACE' || key === 'DELETE') {
          e.preventDefault();
          handleKeyPress('DELETE');
        } else if (/^[A-Z]$/.test(key)) {
          handleKeyPress(key);
        } else if (key === 'TAB') {
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [gameState]);

  if (gameState === 'welcome') {
    return <WelcomeScreen 
      onStartDaily={(mode) => {
        setSelectedMode(mode);
        startGame();
      }}
      onStartPractice={() => {
        setSelectedMode('easy'); // Default for practice
        startGame();
      }}
    />
  }

  if (gameState === 'daily') {
    return <DailyGame onBack={() => setGameState('welcome')} />
  }

  if (gameState === 'won' || gameState === 'lost') {
    return (
      <div className="game-summary">
        <h1 className="title">{gameState === 'won' ? 'You Won!' : 'Game Over'}</h1>
        <p>Target Word: {targetWord}</p>
        {gameState === 'won' && (
          <div className="summary-stats">
            <p>Words Completed: {totalWordsCompleted}</p>
            <p>Final Time: {finalTime}s</p>
          </div>
        )}
        <button onClick={startGame}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1 className="title">Speedle</h1>
      <div className="game-header">
        <div className="score-display">Score: {totalWordsCompleted}</div>
        <div className="timer-display">Time: {timeLeft}s</div>
        <div className="mode-selector">
          <button 
            onClick={() => {
              setSelectedMode('easy');
              startGame();
            }}
            className={selectedMode === 'easy' ? 'active' : ''}
          >
            Easy
          </button>
          <button 
            onClick={() => {
              setSelectedMode('medium');
              startGame();
            }}
            className={selectedMode === 'medium' ? 'active' : ''}
          >
            Medium
          </button>
          <button 
            onClick={() => {
              setSelectedMode('hard');
              startGame();
            }}
            className={selectedMode === 'hard' ? 'active' : ''}
          >
            Hard
          </button>
        </div>
      </div>
      <div id="game-area">
        <Grid guesses={guesses} targetWordLength={targetWordLength} />
        <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
      </div>
    </div>
  )
}

export default App
