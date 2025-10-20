import { GoogleGenAI } from "@google/genai";
import type { Choice } from '../types';

// This guard ensures the code only runs in a browser environment
if (typeof process === 'undefined') {
  (window as any).process = { env: {} };
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getWittyRemark = async (
  playerChoice: Choice, 
  computerChoice: Choice, 
  result: 'win' | 'lose' | 'draw',
  gameWinner: 'Player' | 'AI' | null
): Promise<string> => {
  const model = "gemini-2.5-flash";
  let prompt: string;

  if (gameWinner) {
    if (gameWinner === 'Player') {
        prompt = `You are a witty and slightly arrogant AI playing Rock, Paper, Scissors. The player just beat you by reaching 5 points first. Write a short, funny, one-sentence concession speech or a sarcastic compliment. Keep it under 20 words.`;
    } else { // AI won
        prompt = `You are a witty and supremely arrogant AI playing Rock, Paper, Scissors. You just won the whole game by reaching 5 points first. Write a short, funny, one-sentence victory speech. Keep it under 20 words.`;
    }
  } else if (result === 'draw') {
    prompt = `You are a witty AI playing Rock, Paper, Scissors. You and the player both chose ${playerChoice}. Write a short, funny, one-sentence comment about the draw.`;
  } else {
    const outcome = result === 'win' ? "the player won" : "you (the AI) won";
    prompt = `You are a witty and slightly arrogant AI playing Rock, Paper, Scissors. The player chose ${playerChoice}, you chose ${computerChoice}, and ${outcome}. Write a short, funny, one-sentence taunt or comment about this result. Keep it under 15 words.`;
  }
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "I'm speechless... something went wrong.";
  }
};