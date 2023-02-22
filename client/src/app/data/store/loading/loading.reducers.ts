import { createReducer, on } from '@ngrx/store';
import { LoadingActions } from './loading.actions';

const initialState: boolean = false;

export const loadingReducer = createReducer(
  initialState,
  on(LoadingActions.setLoading, (_state) => !_state)
);
