import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
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
export class SetupFacade {
  private store: Store<AppState> = inject(Store);
  private route = inject(ActivatedRoute);

  public suit$ = this.store.select(selectSuit);

  public groupId$ = this.route.paramMap.pipe(
    filter((paramMap) => !!paramMap.get('gid')),
    map((paramMap) => paramMap.get('gid') as string)
  );

  public setSuit(suit: Suit) {
    this.store.dispatch(SetSuit({ suit }));
  }

  public createGame(suit: Suit, nickname: string) {
    this.store.dispatch(CreateGame({ suit, nickname }));
  }

  public joinGame(group: string, suit: Suit, nickname: string) {
    this.store.dispatch(JoinGame({ group, suit, nickname }));
  }
}
