import React, { useState, useCallback } from 'react';
import Scoreboard from './components/Scoreboard';
import ChoiceButton from './components/ChoiceButton';
import ResultDisplay from './components/ResultDisplay';
import { getWittyRemark } from './services/geminiService';
import type { Choice, Result } from './types';
import { CHOICES, RULES } from './constants';

const WINNING_SCORE = 5;

const App: React.FC = () => {
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [geminiMessage, setGeminiMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<'Player' | 'AI' | null>(null);

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) {
      return 'draw';
    }
    if (RULES[player].beats === computer) {
      return 'win';
    }
    return 'lose';
  };

  const handlePlayerChoice = useCallback(async (choice: Choice) => {
    setIsLoading(true);
    setPlayerChoice(choice);
    
    const aiChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setComputerChoice(aiChoice);

    const gameResult = determineWinner(choice, aiChoice);
    setResult(gameResult);

    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    if (gameResult === 'win') {
      newPlayerScore++;
      setPlayerScore(newPlayerScore);
    } else if (gameResult === 'lose') {
      newComputerScore++;
      setComputerScore(newComputerScore);
    }

    if (newPlayerScore === WINNING_SCORE || newComputerScore === WINNING_SCORE) {
      const winner = newPlayerScore === WINNING_SCORE ? 'Player' : 'AI';
      setGameWinner(winner);
      setGameOver(true);
      const remark = await getWittyRemark(choice, aiChoice, gameResult as 'win'|'lose'|'draw', winner);
      setGeminiMessage(remark);
    } else {
      const remark = await getWittyRemark(choice, aiChoice, gameResult as 'win'|'lose'|'draw', null);
      setGeminiMessage(remark);
    }
    
    setIsLoading(false);
  }, [playerScore, computerScore]);

  const resetRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGeminiMessage('');
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    resetRound();
    setGameOver(false);
    setGameWinner(null);
  }

  const renderContent = () => {
    if (gameOver) {
      const winnerText = gameWinner === 'Player' ? 'You are the Winner!' : 'The AI Wins!';
      const winnerColor = gameWinner === 'Player' ? 'text-cyan-400' : 'text-fuchsia-500';

      return (
        <div className="text-center flex flex-col items-center gap-8 animate-fade-in">
          <h2 className={`text-4xl md:text-6xl font-black uppercase ${winnerColor}`}>{winnerText}</h2>
          {isLoading ? (
             <div className="mt-4 flex items-center gap-2 text-slate-400">
                <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>AI is thinking...</span>
            </div>
          ) : (
             <p className="text-lg md:text-xl italic text-slate-300">"{geminiMessage}"</p>
          )}
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-cyan-500 text-slate-900 font-bold text-xl rounded-lg shadow-lg hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-300"
          >
            New Game
          </button>
        </div>
      );
    }

    if (!playerChoice) {
      return (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-8">Make your choice! First to {WINNING_SCORE} wins.</h2>
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {CHOICES.map((choice) => (
              <ChoiceButton key={choice} choice={choice} onClick={handlePlayerChoice} disabled={isLoading} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-8">
        {playerChoice && computerChoice && result && (
          <ResultDisplay
            playerChoice={playerChoice}
            computerChoice={computerChoice}
            result={result}
            geminiMessage={geminiMessage}
            isLoading={isLoading}
          />
        )}
        <button
          onClick={resetRound}
          className="px-8 py-3 bg-cyan-500 text-slate-900 font-bold text-xl rounded-lg shadow-lg hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-300 disabled:opacity-50"
          disabled={isLoading}
        >
          Next Round
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            Gemini: Rock Paper Scissors
          </span>
        </h1>
        <p className="text-slate-400 mt-2">Can you outsmart a witty AI?</p>
      </header>

      <main className="w-full flex-grow flex flex-col items-center justify-center">
        <Scoreboard playerScore={playerScore} computerScore={computerScore} />
        {renderContent()}
      </main>

      <footer className="py-4 text-center text-slate-500">
        <p>Built by a world-class senior frontend React engineer.</p>
      </footer>
    </div>
  );
};

export default App;