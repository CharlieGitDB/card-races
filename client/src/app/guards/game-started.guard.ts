import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectGameData } from '../data/store/store';
import { AppState } from '../data/types/AppState';

export const GameStartedGuard = () => {
  const router = inject(Router);
  const store: Store<AppState> = inject(Store);
  const gameData$ = store.select(selectGameData);

  return gameData$.pipe(
    tap((data) => {
      if (data.started) {
        return true;
      }

      if (!!data.group) {
        router.navigate(['/lobby']);
      } else {
        router.navigate(['/']);
      }

      return false;
    })
  );
};
