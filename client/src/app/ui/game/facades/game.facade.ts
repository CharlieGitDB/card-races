import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectGameRecentPick,
  selectGameStats,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private store: Store<AppState> = inject(Store);

  public recentPick$ = this.store.select(selectGameRecentPick);
  public stats$ = this.store.select(selectGameStats);
}
