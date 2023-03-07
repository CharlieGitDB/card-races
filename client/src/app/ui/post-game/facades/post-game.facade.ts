import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectGameWinner,
  selectGameWinners,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class PostGameFacade {
  private store: Store<AppState> = inject(Store);

  public isWinner$ = this.store.select(selectUserIsWinner);
  public winner$ = this.store.select(selectGameWinner);
  public winners$ = this.store.select(selectGameWinners);
}
