import { GameStats } from './GameStats';
import { Suit } from './Suit';
import { UserData } from './UserData';

export interface GameEntry {
  id: string;
  userData: UserData;
  pickedSuits: Set<Suit>;
  started: boolean;
  recentPick: Suit | null;
  winner: Suit | null;
  stats: GameStats;
  group: string;
  currentRound: number;
}
