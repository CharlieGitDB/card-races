import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';
import {
  CreateGame,
  GameWasCreated,
  JoinedGame,
  JoinGame,
  ReplayGame,
  SetLoading,
  StartedGame,
  StartGame,
} from '../store';

@Injectable()
export class LoadingEffects {
  private actions$ = inject(Actions);

  loadingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateGame, JoinGame, ReplayGame, StartGame),
      tap(() => console.log('loading')),
      switchMap(async () => SetLoading({ loading: true }))
    )
  );

  disableLoadingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameWasCreated, JoinedGame, StartedGame),
      tap(() => console.log('stopping loading')),
      switchMap(async () => SetLoading({ loading: false }))
    )
  );
}
