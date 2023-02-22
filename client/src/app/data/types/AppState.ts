import { GameEntry } from './GameEntry';
import { SuitState } from './SuitState';

export interface AppState {
  gameData: GameEntry;
  suit: SuitState;
}
