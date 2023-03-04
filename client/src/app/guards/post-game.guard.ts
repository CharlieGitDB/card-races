import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectGameWinner } from '../data/store/store';
import { AppState } from '../data/types/AppState';

export const PostGameGuard = () => {
  const router = inject(Router);
  const store: Store<AppState> = inject(Store);
  const winner$ = store.select(selectGameWinner);

  return winner$.pipe(
    tap((winner) => (!!winner ? true : router.navigate(['/'])))
  );
};
