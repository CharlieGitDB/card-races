import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GameService } from '@services/services';
import { catchError, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AppState } from '../../types/AppState';
import {
  CreateGame,
  GameWasCreated,
  JoinedGame,
  JoinGame,
  NextRound,
  ReplayGame,
  RestartedGame,
  SetGameData,
  StartedGame,
  StartGame,
} from './game.actions';

@Injectable()
export class GameEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private location = inject(Location);
  private store: Store<AppState> = inject(Store);
  private gameService = inject(GameService);

  gameCreateEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateGame),
        tap(() => console.log('create game action was ran')),
        tap(({ suit, nickname }) =>
          this.gameService.createGame(suit, nickname)
        ),
        tap(() => {
          const destroy$ = new Subject<void>();
          this.gameService.createdGame$
            .pipe(
              takeUntil(destroy$),
              catchError((err) => {
                //TODO: handle this
                console.error(err);

                destroy$.next();
                destroy$.complete();
                return of(null);
              })
            )
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

  gameJoinEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JoinGame),
        tap(() => console.log('join game action was ran')),
        tap(({ group, suit, nickname }) =>
          this.gameService.joinGame(group, suit, nickname)
        )
      ),
    { dispatch: false }
  );

  gameReplayEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReplayGame),
        tap(() => console.log('replay game action was ran')),
        tap(({ group }) => this.gameService.restartGame(group))
      ),
    { dispatch: false }
  );

  joinLobbyEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameWasCreated, JoinedGame),
        tap(() => console.log('game was created or joined action was ran')),
        switchMap(async ({ gameData }) => {
          this.store.dispatch(SetGameData({ gameData }));

          if (this.location.path() != '/lobby') {
            this.router.navigate(['lobby']);
          }
        })
      ),
    { dispatch: false }
  );

  gameStartEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StartGame),
        tap(() => console.log('start game action was ran')),
        tap(() => this.gameService.startGame())
      ),
    { dispatch: false }
  );

  gameStartedEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StartedGame),
        tap(() => console.log('game started was ran')),
        switchMap(async ({ gameData }) => {
          this.store.dispatch(SetGameData({ gameData }));

          if (this.location.path() != '/game') {
            this.router.navigate(['game']);
          }
        })
      ),
    { dispatch: false }
  );

  nextRoundEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NextRound),
      tap(() => console.log('next round action was ran')),
      switchMap(async ({ gameData }) => SetGameData({ gameData }))
    )
  );

  restartedGameEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RestartedGame),
        tap(() => console.log('restart action was ran')),
        switchMap(async ({ gameData }) => {
          SetGameData({ gameData });
          this.router.navigate(['/lobby']);
        })
      ),
    { dispatch: false }
  );
}
