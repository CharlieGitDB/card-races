import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserContext } from '../../types/UserContext';

export const USER_KEY = 'user';
export const selectUserContext = createFeatureSelector<UserContext>(USER_KEY);

export const selectUserId = createSelector(
  selectUserContext,
  (userContext) => userContext.id
);
