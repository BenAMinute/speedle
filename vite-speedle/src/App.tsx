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
  const [targetWord] = useState(WORD_LIST[0]);
  const [guesses, setGuesses] = useState<Guess[]>([])

  const [currentGuess, setCurrentGuess] = useState('')
  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({})
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'won' | 'lost' | 'summary' | 'daily'>('welcome')
  
  const [timeLeft, setTimeLeft] = useState(90);
  const [selectedMode, setSelectedMode] = useState<GameMode>('easy');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGame = () => {
    setGameState('playing');
    setGuesses([]);
    setCurrentGuess('');
    setLetterStatuses({});
    setGameStatus('playing');
    setTimeLeft(GameModeConfigs[selectedMode].timeLimit);
  };

  useEffect(() => {
    if (gameState === 'playing' && gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameStatus('lost');
            setGameState('lost');
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

  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length === targetWord.length) {
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
        setGuesses(prev => [...prev, newGuess])
        setCurrentGuess('')
        
        // Update keyboard statuses
        const newLetterStatuses: Record<string, LetterStatus> = {}
        guessLetters.forEach((letter, index) => {
          const s = status[index]
          if (s !== 'empty') {
            newLetterStatuses[letter] = s
          }
        })
        setLetterStatuses(newLetterStatuses)

        if (status.every(s => s === 'correct')) {
          setGameStatus('won')
          setGameState('won')
        } else if (guesses.length >= 5) {
          setGameStatus('lost')
          setGameState('lost')
        }
      }
      return
    }

    if (key === 'DELETE') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (key.length === 1 && key.match(/[A-Z]/)) {
      if (currentGuess.length < targetWord.length && !currentGuess.includes(key)) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

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
        <button onClick={startGame}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1 className="title">Speedle</h1>
      <div className="game-header">
        <div className="score-display">Score: 0</div>
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
        <Grid guesses={guesses} />
        <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
      </div>
    </div>
  )
}

export default App
