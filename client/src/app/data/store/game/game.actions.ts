import { createActionGroup, props } from '@ngrx/store';
import { GameEntry } from '../../types/GameEntry';

const GAME_ACTIONS_SOURCE = 'Game';
const SET_GAME_DATA = 'Set Game Data';

export const GameActions = createActionGroup({
  source: GAME_ACTIONS_SOURCE,
  events: {
    [SET_GAME_DATA]: props<{ gameData: GameEntry }>(),
  },
});
