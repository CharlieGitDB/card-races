import { createReducer, on } from '@ngrx/store';
import { SetLoading } from './loading.actions';

const initialState: boolean = false;

export const loadingReducer = createReducer(
  initialState,
  on(SetLoading, (_state, { loading }) => loading)
);
