
import React from 'react';

interface ScoreboardProps {
  playerScore: number;
  computerScore: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerScore, computerScore }) => {
  return (
    <div className="flex justify-center items-center gap-8 md:gap-16 my-8">
      <div className="text-center p-4 border-2 border-cyan-400 rounded-lg shadow-lg bg-slate-800 w-32">
        <div className="text-lg font-semibold text-cyan-400">PLAYER</div>
        <div className="text-5xl font-bold">{playerScore}</div>
      </div>
      <div className="text-6xl font-bold text-slate-500">:</div>
      <div className="text-center p-4 border-2 border-fuchsia-500 rounded-lg shadow-lg bg-slate-800 w-32">
        <div className="text-lg font-semibold text-fuchsia-500">AI</div>
        <div className="text-5xl font-bold">{computerScore}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
