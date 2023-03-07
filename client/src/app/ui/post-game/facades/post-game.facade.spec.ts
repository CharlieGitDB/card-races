import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, take } from 'rxjs';
import { selectGameWinner } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/Suit';
import { PostGameFacade } from './post-game.facade';

describe('PostGameFacade', () => {
  let postGameFacade: PostGameFacade;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore(), PostGameFacade],
    }).compileComponents();

    postGameFacade = TestBed.inject(PostGameFacade);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should have winner$ when there is a winner$', async () => {
    const mockWinner = SUIT.CLUBS;
    store.overrideSelector(selectGameWinner, mockWinner);
    store.refreshState();

    const winner = await lastValueFrom(postGameFacade.winner$.pipe(take(1)));
    expect(winner).toEqual(mockWinner);
  });
});
