import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameEntry } from '../../types/GameEntry';

export const selectGameData = createFeatureSelector<GameEntry>('game');
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
