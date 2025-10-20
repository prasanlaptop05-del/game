
import React from 'react';
import type { Choice } from './types';

export const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

export const RULES: { [key in Choice]: { beats: Choice } } = {
  rock: { beats: 'scissors' },
  paper: { beats: 'rock' },
  scissors: { beats: 'paper' },
};

export const RockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5c-2.48 0-4.5-2.02-4.5-4.5S10.52 9.5 13 9.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5c0-.83-.67-1.5-1.5-1.5v-1.1c2.47.53 4.29 2.7 4.29 5.31 0 2.21-1.79 4-4 4zM8.5 12.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
  </svg>
);

export const PaperIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

export const ScissorsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.15 6.87c.39-.39.39-1.02 0-1.41L16.27 3.5c-.39-.39-1.02-.39-1.41 0L10 8.44l-1.06-1.06c-.39-.39-1.02-.39-1.41 0L5.34 9.56c-.39.39-.39 1.02 0 1.41L9.56 15.2c.39.39 1.02.39 1.41 0L12 14.12l4.87 4.87c.39.39 1.02.39 1.41 0l1.88-1.88c.39-.39.39-1.02 0-1.41L15.3 10.88l2.85-2.85zM7.5 11.06L6.75 10.3l.75-.75L8.25 10.3l-.75.76zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-10c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

export const ICONS: { [key in Choice]: React.FC<{ className?: string }> } = {
  rock: RockIcon,
  paper: PaperIcon,
  scissors: ScissorsIcon,
};
