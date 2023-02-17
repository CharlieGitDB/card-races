import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CreateGame,
  JoinGame,
  selectSuit,
  SetSuit,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { Suit } from 'src/app/data/types/Suit';

@Injectable({
  providedIn: 'root',
})
export class IntroFacade {
  private store: Store<AppState> = inject(Store);

  public suit$ = this.store.select(selectSuit);

  public setSuit(suit: Suit) {
    this.store.dispatch(SetSuit({ suit }));
  }

  public createGame(suit: Suit) {
    this.store.dispatch(CreateGame({ suit }));
  }

  public joinGame(group: string, suit: Suit) {
    this.store.dispatch(JoinGame({ group, suit }));
  }
}
