import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, take } from 'rxjs';
import {
  CreateGame,
  JoinGame,
  selectSuit,
  SetSuit,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_GROUP_ID } from 'src/app/testing/mock';
import { SetupFacade } from './setup.facade';

describe('SetupFacade', () => {
  let setupFacade: SetupFacade;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore(), SetupFacade],
    }).compileComponents();

    setupFacade = TestBed.inject(SetupFacade);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should dispatch setSuit on intro.setSuit', () => {
    spyOn((setupFacade as any).store, 'dispatch');
    setupFacade.setSuit(SUIT.CLUBS);

    expect((setupFacade as any).store.dispatch).toHaveBeenCalledWith(
      SetSuit({ suit: SUIT.CLUBS })
    );
  });

  it('should dispatch createGame on intro.createGame', () => {
    spyOn((setupFacade as any).store, 'dispatch');
    setupFacade.createGame(SUIT.HEARTS);

    expect((setupFacade as any).store.dispatch).toHaveBeenCalledWith(
      CreateGame({ suit: SUIT.HEARTS })
    );
  });

  it('should dispatch joinGame on intro.joinGame', () => {
    spyOn((setupFacade as any).store, 'dispatch');
    setupFacade.joinGame(MOCK_GROUP_ID, SUIT.SPADES);

    expect((setupFacade as any).store.dispatch).toHaveBeenCalledWith(
      JoinGame({ group: MOCK_GROUP_ID, suit: SUIT.SPADES })
    );
  });

  it('should have users when selectGameUserData', async () => {
    store.overrideSelector(selectSuit, SUIT.DIAMONDS);
    store.refreshState();

    const suit = await lastValueFrom(setupFacade.suit$.pipe(take(1)));

    expect(suit).toEqual(SUIT.DIAMONDS);
  });
});
