import React from 'react';
import type { Choice } from '../types';
import { ICONS } from '../constants';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: (choice: Choice) => void;
  disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onClick, disabled }) => {
  const Icon = ICONS[choice];
  const colors = {
    rock: 'bg-red-500 hover:bg-red-600 focus:ring-red-400',
    paper: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
    scissors: 'bg-green-500 hover:bg-green-600 focus:ring-green-400',
  };

  return (
    <button
      onClick={() => onClick(choice)}
      disabled={disabled}
      className={`flex flex-col items-center justify-center gap-2 p-4 w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${colors[choice]}`}
      aria-label={`Select ${choice}`}
    >
      <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
      <span className="text-md md:text-lg font-bold uppercase tracking-wider">{choice}</span>
    </button>
  );
};

export default ChoiceButton;