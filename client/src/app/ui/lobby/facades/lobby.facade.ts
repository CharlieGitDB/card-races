import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectGameGroupId,
  selectGameUserData,
  StartGame,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class LobbyFacade {
  private store: Store<AppState> = inject(Store);

  public groupId$ = this.store.select(selectGameGroupId);
  public users$ = this.store.select(selectGameUserData);

  public startGame() {
    this.store.dispatch(StartGame());
  }
}
