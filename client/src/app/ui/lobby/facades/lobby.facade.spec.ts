import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, take } from 'rxjs';
import {
  selectGameGroupId,
  selectGameUserData,
  StartGame,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_GROUP_ID, MOCK_USER_ID } from 'src/app/testing/mock';
import { LobbyFacade } from './lobby.facade';

describe('LobbyFacade', () => {
  let lobbyFacade: LobbyFacade;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore(), LobbyFacade],
    }).compileComponents();

    lobbyFacade = TestBed.inject(LobbyFacade);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should dispatch startGame on lobbyFacade.startGame', () => {
    spyOn((lobbyFacade as any).store, 'dispatch');
    lobbyFacade.startGame();
    expect((lobbyFacade as any).store.dispatch).toHaveBeenCalledWith(
      StartGame()
    );
  });

  it('should have groupId when selectGameGroupid is set', async () => {
    store.overrideSelector(selectGameGroupId, MOCK_GROUP_ID);
    store.refreshState();

    const groupId = await lastValueFrom(lobbyFacade.groupId$.pipe(take(1)));

    expect(groupId).toEqual(MOCK_GROUP_ID);
  });

  it('should have users when selectGameUserData', async () => {
    const mockUsers = {
      [MOCK_USER_ID]: SUIT.CLUBS,
    };
    store.overrideSelector(selectGameUserData, mockUsers);

    store.refreshState();

    const users = await lastValueFrom(lobbyFacade.users$.pipe(take(1)));

    expect(users).toEqual(mockUsers);
  });
});
