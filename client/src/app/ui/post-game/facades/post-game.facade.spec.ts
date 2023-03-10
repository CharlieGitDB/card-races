import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, take } from 'rxjs';
import {
  ReplayGame,
  selectGameGroupId,
  selectGameWinner,
  selectGameWinners,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT, suitDisplayLabels } from 'src/app/data/types/Suit';
import { UserContext } from 'src/app/data/types/UserContext';
import { MOCK_GROUP_ID, MOCK_NICKNAME } from 'src/app/testing/mock';
import { PostGameFacade } from './post-game.facade';

describe('PostGameFacade', () => {
  let postGameFacade: PostGameFacade;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
    expect(winner).toEqual(suitDisplayLabels[mockWinner]);
  });

  it('should have isWinner$ when there is a isWinner$ value', async () => {
    const mockIsWinner = true;
    store.overrideSelector(selectUserIsWinner, mockIsWinner);
    store.refreshState();

    const winner = await lastValueFrom(postGameFacade.isWinner$.pipe(take(1)));
    expect(winner).toEqual(mockIsWinner);
  });

  it('should dispatch ReplayGame action when replayGame is called', async () => {
    spyOn((postGameFacade as any).store, 'dispatch');

    store.overrideSelector(selectGameGroupId, MOCK_GROUP_ID);
    store.refreshState();

    await postGameFacade.replayGame();

    expect((postGameFacade as any).store.dispatch).toHaveBeenCalledWith(
      ReplayGame({ group: MOCK_GROUP_ID })
    );
  });

  it('should have isWinner$ when there is a isWinner$ value', async () => {
    const mockWinners: UserContext[] = [
      {
        group: MOCK_GROUP_ID,
        id: MOCK_GROUP_ID,
        nickname: MOCK_NICKNAME,
        suit: SUIT.CLUBS,
      },
      {
        group: MOCK_GROUP_ID,
        id: MOCK_GROUP_ID,
        nickname: 'nic',
        suit: SUIT.CLUBS,
      },
    ];
    store.overrideSelector(selectGameWinners, mockWinners);
    store.refreshState();

    const winners = await lastValueFrom(postGameFacade.winners$.pipe(take(1)));
    expect(winners[0].suit).toEqual(SUIT.CLUBS);
    expect(winners[1].suit).toEqual(SUIT.CLUBS);
  });

  it('should call router when goToIntroPage is called', async () => {
    spyOn((postGameFacade as any).router, 'navigate');

    postGameFacade.goToIntroPage();

    expect((postGameFacade as any).router.navigate).toHaveBeenCalledWith(['/']);
  });
});
