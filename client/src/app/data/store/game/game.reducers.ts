import { createReducer, on } from '@ngrx/store';
import { GameEntry } from '../../types/GameEntry';
import { SetGameData } from './game.actions';

const initialState: Partial<GameEntry> = {
  recentPick: null,
};

export const gameReducer = createReducer(
  initialState,
  on(SetGameData, (_state, { gameData }) => gameData)
);
