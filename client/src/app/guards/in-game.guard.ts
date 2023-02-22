import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectGameGroupId } from '../data/store/store';
import { AppState } from '../data/types/AppState';

export const InGameGuard = () => {
  const router = inject(Router);
  const store: Store<AppState> = inject(Store);
  const gameData$ = store.select(selectGameGroupId);

  return gameData$.pipe(
    tap((groupId) => (!!groupId ? true : router.navigate(['/'])))
  );
};
