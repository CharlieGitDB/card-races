import { createReducer, on } from '@ngrx/store';
import { UserContext } from '../../types/UserContext';
import { SetUserContext, SetUserId } from './user.actions';

const initialState: Partial<UserContext> = {};

export const userReducer = createReducer(
  initialState,
  on(SetUserContext, (_state, { userContext }) => userContext),
  on(SetUserId, (_state, { userId }) => ({
    ..._state,
    userId,
  }))
);
