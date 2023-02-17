import { createReducer, on } from '@ngrx/store';
import { SuitState } from '../../types/SuitState';
import { SetSuit } from './suit.actions';

const initialState: SuitState = {
  suit: null,
};

export const suitReducer = createReducer(
  initialState,
  on(SetSuit, (_state, { suit }) => ({
    suit,
  }))
);
