import { Suit } from './Suit';

export interface GameEntry {
  id: string;
  userData: Record<string, Suit>;
  pickedSuits: Set<Suit>;
  started: boolean;
  winner: Suit;
  stats: Record<Suit, number>;
  group: string;
  currentRound: number;
}