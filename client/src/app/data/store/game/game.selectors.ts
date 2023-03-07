import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameEntry } from '../../types/GameEntry';
import { selectUserContext } from '../user/user.selectors';

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
export const selectGameRecentPick = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.recentPick
);
export const selectGameWinner = createSelector(
  selectGameData,
  (gameEntry) => gameEntry.winner
);
export const selectUserIsWinner = createSelector(
  selectGameWinner,
  selectUserContext,
  (winner, userContext) => userContext.suit === winner
);
export const selectGameWinners = createSelector(
  selectGameUserData,
  selectGameWinner,
  (userData, winner) =>
    Object.values(userData).filter((userContext) => userContext.suit === winner)
);
