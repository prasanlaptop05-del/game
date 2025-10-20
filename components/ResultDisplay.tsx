
import React from 'react';
import type { Choice, Result } from '../types';
import { ICONS } from '../constants';

interface ResultDisplayProps {
  playerChoice: Choice;
  computerChoice: Choice;
  result: Result;
  geminiMessage: string;
  isLoading: boolean;
}

const ChoiceDisplay: React.FC<{ title: string; choice: Choice; result: Result | null; isPlayer: boolean }> = ({ title, choice, result, isPlayer }) => {
  const Icon = ICONS[choice];
  
  const ringColor = result === 'draw' ? 'ring-yellow-500' :
    (isPlayer && result === 'win') || (!isPlayer && result === 'lose') ? 'ring-green-500' :
    'ring-red-500';

  const glowEffect = result !== null && result !== 'draw' && ((isPlayer && result === 'win') || (!isPlayer && result === 'lose')) ? 'animate-pulse' : '';

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider">{title}</h2>
      <div className={`p-6 md:p-8 rounded-full bg-slate-800 ring-4 ${ringColor} ${glowEffect}`}>
        <Icon className="w-20 h-20 md:w-28 md:h-28" />
      </div>
    </div>
  );
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ playerChoice, computerChoice, result, geminiMessage, isLoading }) => {
  const getResultText = () => {
    switch (result) {
      case 'win': return "You Win!";
      case 'lose': return "You Lose!";
      case 'draw': return "It's a Draw!";
      default: return "";
    }
  };

  const resultColor = result === 'win' ? 'text-green-400' : result === 'lose' ? 'text-red-400' : 'text-yellow-400';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 my-8">
      <div className="flex justify-around items-center w-full">
        <ChoiceDisplay title="You Picked" choice={playerChoice} result={result} isPlayer={true} />
        <div className="text-4xl font-black text-slate-600 hidden md:block">VS</div>
        <ChoiceDisplay title="AI Picked" choice={computerChoice} result={result} isPlayer={false} />
      </div>
      
      <div className="text-center h-24 flex flex-col justify-center items-center">
        <h3 className={`text-4xl md:text-5xl font-extrabold uppercase ${resultColor}`}>{getResultText()}</h3>
        {isLoading ? (
            <div className="mt-4 flex items-center gap-2 text-slate-400">
                <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>AI is thinking...</span>
            </div>
        ) : (
            <p className="mt-4 text-lg md:text-xl italic text-slate-300">"{geminiMessage}"</p>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
