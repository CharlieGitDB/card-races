import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuitState } from '../../types/SuitState';

export const SUIT_KEY = 'suit';
export const selectSuitData = createFeatureSelector<SuitState>(SUIT_KEY);
export const selectSuit = createSelector(
  selectSuitData,
  (suitState) => suitState.suit
);
