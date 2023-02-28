import { GAME_KEY, LOADING_KEY, SUIT_KEY } from 'src/app/data/store/store';
import { USER_KEY } from 'src/app/data/store/user/user.selectors';
import { AppState, GameEntry, Suit, SUIT } from 'src/app/data/types/types';

export const MOCK_USER_ID = 'fakeuserid';
export const MOCK_GROUP_ID = 'fakegroupid';

export const MOCK_USER_CONTEXT = {
  id: MOCK_USER_ID,
  suit: SUIT.CLUBS,
  group: MOCK_GROUP_ID,
};

export const MOCK_SUIT_STATE = {
  [SUIT_KEY]: SUIT.CLUBS,
};

export const MOCK_GAME_ENTRY: GameEntry = {
  id: MOCK_GROUP_ID,
  group: MOCK_GROUP_ID,
  currentRound: 0,
  pickedSuits: new Set<Suit>([SUIT.CLUBS]),
  started: false,
  recentPick: SUIT.DIAMONDS,
  stats: {
    CLUBS: 0,
    HEARTS: 0,
    DIAMONDS: 0,
    SPADES: 0,
  },
  userData: {
    [MOCK_USER_ID]: SUIT.CLUBS,
  },
  winner: null,
};

export const MOCK_INITIAL_STORE_STATE: AppState = {
  [USER_KEY]: MOCK_USER_CONTEXT,
  [SUIT_KEY]: MOCK_SUIT_STATE,
  [GAME_KEY]: MOCK_GAME_ENTRY,
  [LOADING_KEY]: false,
};
