import { GAME_KEY, LOADING_KEY, SUIT_KEY } from '../store/store';
import { USER_KEY } from '../store/user/user.selectors';
import { GameEntry } from './GameEntry';
import { SuitState } from './SuitState';
import { UserContext } from './UserContext';

export interface AppState {
  [USER_KEY]: UserContext;
  [GAME_KEY]: GameEntry;
  [SUIT_KEY]: SuitState;
  [LOADING_KEY]: boolean;
}
