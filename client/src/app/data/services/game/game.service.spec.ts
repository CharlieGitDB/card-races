import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MOCK_GAME_ENTRY } from 'src/app/testing/mock';
import { EVENT_TYPE } from '../../types/EventType';
import { Response } from '../../types/Response';
import { SCOPE } from '../../types/Scope';

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
});
