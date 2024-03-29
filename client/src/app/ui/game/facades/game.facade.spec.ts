import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, take } from 'rxjs';
import { selectGameData, selectGameStats } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_GAME_ENTRY } from 'src/app/testing/mock';
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

  afterEach(() => store.resetSelectors());

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

  it('should have recentPick$ when store game.recentPick has value', async () => {
    const mockRecentPick = SUIT.DIAMONDS;
    store.overrideSelector(selectGameData, {
      ...MOCK_GAME_ENTRY,
      recentPick: mockRecentPick,
    });
    store.refreshState();

    const recentPick = await lastValueFrom(
      gameFacade.recentPick$.pipe(take(1))
    );

    expect(recentPick).toEqual(mockRecentPick);
  });
});
