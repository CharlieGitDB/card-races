import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GameService } from '@services/services';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AppState } from '../../types/AppState';
import { CreateGame, GameWasCreated, SetGameData } from './game.actions';

@Injectable()
export class GameEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private store: Store<AppState> = inject(Store);
  private gameService = inject(GameService);

  gameCreateEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateGame),
        tap(() => console.log('create game action was ran')),
        tap(({ suit }) => this.gameService.createGame(suit)),
        tap(() => {
          const destroy$ = new Subject<void>();
          this.gameService.createdGame$
            .pipe(takeUntil(destroy$))
            .subscribe((response) => {
              //wait until the websockets returns a created game
              if (response) {
                this.store.dispatch(
                  GameWasCreated({ gameData: response.data })
                );

                //then immediately unsubscribe
                destroy$.next();
                destroy$.complete();
              }
            });
        })
      ),
    //use when the side effect does not return another action
    { dispatch: false }
  );

  gameCreatedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameWasCreated),
      tap(() => console.log('Game was created action was ran')),
      switchMap(async ({ gameData }) => {
        this.router.navigate(['lobby']);
        return SetGameData({ gameData });
      })
    )
  );
}
