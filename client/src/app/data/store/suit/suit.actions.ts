import { createAction, props } from '@ngrx/store';
import { Suit } from '../../types/Suit';

const SET_SUIT = '[SUIT] Set suit';

export const SetSuit = createAction(SET_SUIT, props<{ suit: Suit }>());
