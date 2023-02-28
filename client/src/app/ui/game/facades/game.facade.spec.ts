import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, take } from 'rxjs';
import {
  selectGameStats,
  selectGameWinner,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/Suit';
import { GameFacade } from './game.facade';

describe('GameFacade', () => {
  let gameFacade: GameFacade;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore(), GameFacade],
    }).compileComponents();

    gameFacade = TestBed.inject(GameFacade);
    store = TestBed.inject(MockStore);
  });

  it('should have stats$ when selectGameStats', async () => {
    const mockStats = {
      CLUBS: 2,
      HEARTS: 1,
      DIAMONDS: 3,
      SPADES: 3,
    };
    store.overrideSelector(selectGameStats, mockStats);
    store.refreshState();

    const stats = await lastValueFrom(gameFacade.stats$.pipe(take(1)));

    expect(stats).toEqual(mockStats);
  });

  it('should have winner$ when selectGameWinner', async () => {
    const mockWinner = SUIT.SPADES;
    store.overrideSelector(selectGameWinner, mockWinner);
    store.refreshState();

    const winner = await lastValueFrom(gameFacade.winner$.pipe(take(1)));

    expect(winner).toEqual(mockWinner);
  });

  it('should have isWinner$ when selectUserIsWinner', async () => {
    const mockWinner = true;
    store.overrideSelector(selectUserIsWinner, mockWinner);
    store.refreshState();

    const winner = await lastValueFrom(gameFacade.isWinner$.pipe(take(1)));

    expect(winner).toEqual(mockWinner);
  });
});
