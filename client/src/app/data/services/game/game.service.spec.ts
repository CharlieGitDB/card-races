import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  MOCK_GAME_ENTRY,
  MOCK_GROUP_ID,
  MOCK_NICKNAME,
  MOCK_USER_CONTEXT,
  MOCK_USER_ID,
} from 'src/app/testing/mock';
import { EVENT_TYPE } from '../../types/EventType';
import { Response } from '../../types/Response';
import { SCOPE } from '../../types/Scope';
import { SUIT } from '../../types/Suit';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should only emit messages with event type Event_TYPE.CREATED', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.ADVANCE,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.CREATED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    let count = 0;
    service.createdGame$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.CREATED);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(MOCK_GAME_ENTRY);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.JOINED', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.ADVANCE,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.JOINED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    let count = 0;
    service.joinedGame$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.JOINED);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(MOCK_GAME_ENTRY);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.STARTED', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.ADVANCE,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    let count = 0;
    service.startedGame$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.STARTED);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(MOCK_GAME_ENTRY);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.RESTARTED', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.ADVANCE,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.RESTARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    let count = 0;
    service.restartedGame$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.RESTARTED);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(MOCK_GAME_ENTRY);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.ADVANCE', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.ADVANCE,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    let count = 0;
    service.nextRound$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.ADVANCE);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(MOCK_GAME_ENTRY);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.WINNER', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockWinner = {
      [MOCK_USER_ID]: SUIT.CLUBS,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.WINNER,
      scope: SCOPE.GROUP,
      data: mockWinner,
    };

    let count = 0;
    service.winner$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.WINNER);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(mockWinner);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.INFO', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockInfo = 'Info emit';

    const mockResponse: Response = {
      eventType: EVENT_TYPE.INFO,
      scope: SCOPE.GROUP,
      data: mockInfo,
    };

    let count = 0;
    service.info$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.INFO);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(mockInfo);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with event type Event_TYPE.ERROR', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockError = 'This is an error';

    const mockResponse: Response = {
      eventType: EVENT_TYPE.ERROR,
      scope: SCOPE.GROUP,
      data: mockError,
    };

    let count = 0;
    service.errors$.subscribe(({ eventType, scope, data }) => {
      count++;
      if (count <= 2) {
        expect(eventType).toEqual(EVENT_TYPE.ERROR);
        expect(scope).toEqual(SCOPE.GROUP);
        expect(data).toEqual(mockError);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with scope.ALL', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockData = 'This is data';

    const mockResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.ALL,
      data: mockData,
    };

    let count = 0;
    service.everyoneScope$.subscribe(({ scope }) => {
      count++;
      if (count <= 2) {
        expect(scope).toEqual(SCOPE.ALL);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with scope.USER', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.USER,
      data: MOCK_USER_CONTEXT,
    };

    let count = 0;
    service.userScope$.subscribe(({ scope, data }) => {
      count++;
      if (count <= 2) {
        expect(scope).toEqual(SCOPE.USER);
        expect(data).toEqual(MOCK_USER_CONTEXT);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should only emit messages with scope.GROUP', (done) => {
    const badResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.USER,
      data: MOCK_GAME_ENTRY,
    };

    const mockResponse: Response = {
      eventType: EVENT_TYPE.STARTED,
      scope: SCOPE.GROUP,
      data: MOCK_USER_CONTEXT,
    };

    let count = 0;
    service.groupScope$.subscribe(({ scope }) => {
      count++;
      if (count <= 2) {
        expect(scope).toEqual(SCOPE.GROUP);
      } else {
        done();
      }
    });

    [...Array(6)].forEach((_, i) => {
      i % 2 === 0
        ? (service as any).messageSubject$.next(of(mockResponse))
        : (service as any).messageSubject$.next(of(badResponse));
    });
  });

  it('should have eventType create on message', () => {
    spyOn(service, 'createGame').and.callThrough();
    spyOn(service as any, 'sendMessage');

    const mockSuit = SUIT.CLUBS;
    const nickname = MOCK_NICKNAME;
    service.createGame(mockSuit, nickname);

    expect(service.createGame).toHaveBeenCalled();
    expect((service as any).sendMessage).toHaveBeenCalledWith({
      eventType: EVENT_TYPE.CREATE,
      data: {
        suit: mockSuit,
        nickname,
      },
    });
  });

  it('should have eventType join on message', () => {
    spyOn(service, 'joinGame').and.callThrough();
    spyOn(service as any, 'sendMessage');

    const suit = SUIT.CLUBS;
    service.joinGame(MOCK_GROUP_ID, suit, MOCK_NICKNAME);

    expect(service.joinGame).toHaveBeenCalled();
    expect((service as any).sendMessage).toHaveBeenCalledWith({
      eventType: EVENT_TYPE.JOIN,
      data: {
        group: MOCK_GROUP_ID,
        suit: SUIT.CLUBS,
        nickname: MOCK_NICKNAME,
      },
    });
  });

  it('should have eventType start on message', () => {
    spyOn(service, 'startGame').and.callThrough();
    spyOn(service as any, 'sendMessage');

    service.startGame();

    expect(service.startGame).toHaveBeenCalled();
    expect((service as any).sendMessage).toHaveBeenCalledWith({
      eventType: EVENT_TYPE.START,
    });
  });

  it('should have eventType restart on message', () => {
    spyOn(service, 'restartGame').and.callThrough();
    spyOn(service as any, 'sendMessage');

    service.restartGame(MOCK_GROUP_ID);

    expect(service.restartGame).toHaveBeenCalled();
    expect((service as any).sendMessage).toHaveBeenCalledWith({
      eventType: EVENT_TYPE.REPLAY,
      data: {
        group: MOCK_GROUP_ID,
      },
    });
  });
});
