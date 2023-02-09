import { createActionGroup, props } from '@ngrx/store';

const LOADING_ACTIONS_SOURCE = 'Loading';
const SET_LOADING = 'Set Loading';

export const LoadingActions = createActionGroup({
  source: LOADING_ACTIONS_SOURCE,
  events: {
    [SET_LOADING]: props,
  },
});
