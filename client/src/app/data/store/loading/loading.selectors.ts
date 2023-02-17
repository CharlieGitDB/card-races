import { createFeatureSelector } from '@ngrx/store';

export const LOADING_KEY = 'loading';
export const selectLoadingData = createFeatureSelector<boolean>(LOADING_KEY);
