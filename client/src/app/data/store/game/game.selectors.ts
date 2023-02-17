import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameEntry } from '../../types/GameEntry';

export const GAME_KEY = 'game';
export const selectGameData = createFeatureSelector<GameEntry>(GAME_KEY);
export const selectGameUserData = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.userData
);
export const selectGameStarted = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.started
);
export const selectGameStats = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.stats
);
export const selectGameCurrentRound = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.currentRound
);
export const selectGameGroupId = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.group
);
