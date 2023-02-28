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
import { IntroFacade } from './intro.facade';

describe('IntroFacade', () => {
  let introFacade: IntroFacade;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore(), IntroFacade],
    }).compileComponents();

    introFacade = TestBed.inject(IntroFacade);
    store = TestBed.inject(MockStore);
  });

  it('should dispatch setSuit on intro.setSuit', () => {
    spyOn((introFacade as any).store, 'dispatch');
    introFacade.setSuit(SUIT.CLUBS);

    expect((introFacade as any).store.dispatch).toHaveBeenCalledWith(
      SetSuit({ suit: SUIT.CLUBS })
    );
  });

  it('should dispatch createGame on intro.createGame', () => {
    spyOn((introFacade as any).store, 'dispatch');
    introFacade.createGame(SUIT.HEARTS);

    expect((introFacade as any).store.dispatch).toHaveBeenCalledWith(
      CreateGame({ suit: SUIT.HEARTS })
    );
  });

  it('should dispatch joinGame on intro.joinGame', () => {
    spyOn((introFacade as any).store, 'dispatch');
    introFacade.joinGame(MOCK_GROUP_ID, SUIT.SPADES);

    expect((introFacade as any).store.dispatch).toHaveBeenCalledWith(
      JoinGame({ group: MOCK_GROUP_ID, suit: SUIT.SPADES })
    );
  });

  it('should have users when selectGameUserData', async () => {
    store.overrideSelector(selectSuit, SUIT.DIAMONDS);
    store.refreshState();

    const suit = await lastValueFrom(introFacade.suit$.pipe(take(1)));

    expect(suit).toEqual(SUIT.DIAMONDS);
  });
});
