import { createAction, props } from '@ngrx/store';
import { GameEntry, Suit } from '../../types/types';

const SET_GAME_DATA = '[GAME] Set game data';
const CREATE_GAME = '[GAME] Create game';
const GAME_CREATED = '[GAME] New game created';

export const CreateGame = createAction(CREATE_GAME, props<{ suit: Suit }>());

export const GameWasCreated = createAction(
  GAME_CREATED,
  props<{ gameData: GameEntry }>()
);

export const SetGameData = createAction(
  SET_GAME_DATA,
  props<{ gameData: GameEntry }>()
);
