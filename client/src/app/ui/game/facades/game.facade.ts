import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import {
  selectGameData,
  selectGameStats,
  selectGameWinner,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);

  public stats$ = this.store.select(selectGameStats);

  public recentPick$ = this.store.select(selectGameData).pipe(
    map((gameEntry) => gameEntry.recentPick) //use map instead of selector to avoid memoized selection
  );

  public watchForWinner$ = this.store.select(selectGameWinner).pipe(
    tap((winner) => {
      if (!!winner) {
        //delay slightly on purpose
        setTimeout(() => this.router.navigate(['/post-game']), 1500);
      }
    })
  );
}
