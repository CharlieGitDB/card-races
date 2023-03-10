import { createAction, props } from '@ngrx/store';

const SET_LOADING = '[LOADING] Set Loading';

export const SetLoading = createAction(
  SET_LOADING,
  props<{ loading: boolean }>()
);
