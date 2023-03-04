import { createAction, props } from '@ngrx/store';
import { GameEntry, Suit } from '../../types/types';

const SET_GAME_DATA = '[GAME] Set game data';

const CREATE_GAME = '[GAME] Create game';
const GAME_CREATED = '[GAME] New game created';

const JOIN_GAME = '[GAME] Join game';
const JOINED_GAME = '[GAME] Game was joined';

const START_GAME = '[GAME] Start game';
const STARTED_GAME = '[GAME] Started game';

const NEXT_ROUND = '[GAME] Start next round';

export const CreateGame = createAction(
  CREATE_GAME,
  props<{ suit: Suit; nickname: string }>()
);

export const GameWasCreated = createAction(
  GAME_CREATED,
  props<{ gameData: GameEntry }>()
);

export const JoinGame = createAction(
  JOIN_GAME,
  props<{ group: string; suit: Suit; nickname: string }>()
);

export const JoinedGame = createAction(
  JOINED_GAME,
  props<{ gameData: GameEntry }>()
);

export const StartGame = createAction(START_GAME, props);

export const StartedGame = createAction(
  STARTED_GAME,
  props<{ gameData: GameEntry }>()
);

export const NextRound = createAction(
  NEXT_ROUND,
  props<{ gameData: GameEntry }>()
);

export const SetGameData = createAction(
  SET_GAME_DATA,
  props<{ gameData: GameEntry }>()
);
