import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GAME_KEY, LOADING_KEY, SUIT_KEY } from 'src/app/data/store/store';
import { USER_KEY } from 'src/app/data/store/user/user.selectors';
import { AppState, GameEntry, Suit, SUIT } from 'src/app/data/types/types';

export const MOCK_USER_ID = 'fakeuserid';
export const MOCK_GROUP_ID = 'fakegrou';
export const MOCK_NICKNAME = 'moc';

export const MOCK_USER_CONTEXT = {
  id: MOCK_USER_ID,
  suit: SUIT.CLUBS,
  group: MOCK_GROUP_ID,
  nickname: MOCK_NICKNAME,
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
  recentPick: null,
  stats: {
    CLUBS: 0,
    HEARTS: 0,
    DIAMONDS: 0,
    SPADES: 0,
  },
  userData: {
    [MOCK_USER_ID]: {
      id: MOCK_USER_ID,
      group: MOCK_GROUP_ID,
      suit: SUIT.CLUBS,
      nickname: MOCK_NICKNAME,
    },
  },
  winner: null,
};

export const MOCK_INITIAL_STORE_STATE: AppState = {
  [USER_KEY]: MOCK_USER_CONTEXT,
  [SUIT_KEY]: MOCK_SUIT_STATE,
  [GAME_KEY]: MOCK_GAME_ENTRY,
  [LOADING_KEY]: false,
};

export const MOCK_ACTIVATED_ROUTE = {
  provide: ActivatedRoute,
  useValue: {
    paramMap: of({
      get(): string {
        return MOCK_NICKNAME;
      },
    }),
  },
};

export const MOCK_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useValue: {
    writeValue: () => {},
    registerOnChange: () => {},
    registerOnTouched: () => {},
  },
  multi: true,
};
