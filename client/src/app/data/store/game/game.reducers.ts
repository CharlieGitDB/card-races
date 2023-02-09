import { createReducer, on } from '@ngrx/store';
import { GameEntry } from '../../types/GameEntry';
import { GameActions } from './game.actions';

const initialState: Partial<GameEntry> = {};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.setGameData, (_state, { gameData }) => gameData)
);
