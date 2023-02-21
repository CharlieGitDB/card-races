import { createAction, props } from '@ngrx/store';
import { UserContext } from '../../types/UserContext';

const SET_USER_CONTEXT = '[USER] Set user context';
const SET_USER_CONTEXT_ID = '[USER] Set user id';

export const SetUserContext = createAction(
  SET_USER_CONTEXT,
  props<{ userContext: UserContext }>()
);

export const SetUserId = createAction(
  SET_USER_CONTEXT_ID,
  props<{ userId: string }>()
);
