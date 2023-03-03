import { Suit } from './Suit';

export interface UserContext {
  id: string;
  group: string;
  suit: Suit;
  nickname: string;
}
