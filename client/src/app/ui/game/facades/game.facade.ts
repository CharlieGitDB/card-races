import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, skip } from 'rxjs';
import {
  selectGameData,
  selectGameStats,
  selectGameWinner,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private store: Store<AppState> = inject(Store);

  public stats$ = this.store.select(selectGameStats);

  public recentPick$ = this.store.select(selectGameData).pipe(
    skip(1), //skip the first emit, as the game hasn't started
    map((gameEntry) => gameEntry.recentPick) //use map instead of selector to avoid memoized selection
  );

  public winner$ = this.store.select(selectGameWinner);

  public isWinner$ = this.store.select(selectUserIsWinner);
}
