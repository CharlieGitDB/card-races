import { Injectable } from '@angular/core';
import { filter, map, of, Subject, switchAll, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MessageData } from '../../types/MessageData';
import { SCOPE } from '../../types/Scope';
import {
  EVENT_TYPE,
  GameEntry,
  Message,
  Response,
  Suit,
  UserContext,
  Winner,
} from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private socket$: WebSocketSubject<any> | null = null;
  private messageSubject$ = new Subject<any>();
  private messages$ = this.messageSubject$.pipe(switchAll());
  private response$ = this.messages$.pipe(map((res) => res as Response));

  public createdGame$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.CREATED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public joinedGame$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.JOINED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public startedGame$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.STARTED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public restartedGame$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.RESTARTED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public nextRound$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.ADVANCE),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public winner$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.WINNER),
    map((res) => ({
      ...res,
      data: res.data as Winner,
    }))
  );

  public info$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.INFO),
    map((res) => ({
      ...res,
      data: res.data as string | MessageData,
    }))
  );

  public errors$ = this.response$.pipe(
    filter((res) => res.eventType === EVENT_TYPE.ERROR),
    map((res) => ({
      ...res,
      data: res.data as string,
    }))
  );

  public everyoneScope$ = this.response$.pipe(
    filter((res) => res.scope === SCOPE.ALL)
  );

  public userScope$ = this.response$.pipe(
    filter((res) => res.scope === SCOPE.USER),
    map((res) => ({
      ...res,
      data: res.data as string | UserContext,
    }))
  );

  public groupScope$ = this.response$.pipe(
    filter((res) => res.scope === SCOPE.GROUP)
  );

  public all$ = this.response$;

  public connect(url: string): void {
    this.socket$ = webSocket(url);
    this.socket$
      .pipe(
        tap((data) => this.messageSubject$.next(of(data))),
        tap({
          error: (error: any) => console.error(error),
        })
      )
      .subscribe({
        error: (err) => console.log(err, 'error???'),
      });
  }

  public createGame(suit: Suit, nickname: string) {
    const message: Message = {
      eventType: EVENT_TYPE.CREATE,
      data: {
        suit,
        nickname,
      },
    };

    this.sendMessage(message);
  }

  public joinGame(group: string, suit: Suit, nickname: string) {
    const message: Message = {
      eventType: EVENT_TYPE.JOIN,
      data: {
        group,
        suit,
        nickname,
      },
    };

    this.sendMessage(message);
  }

  public startGame() {
    const message: Message = {
      eventType: EVENT_TYPE.START,
    };
    this.sendMessage(message);
  }

  public restartGame(group: string) {
    const message: Message = {
      eventType: EVENT_TYPE.REPLAY,
      data: {
        group,
      },
    };
    this.sendMessage(message);
  }

  private sendMessage(message: unknown) {
    this.socket$?.next(message);
  }

  public close() {
    this.socket$?.complete();
  }
}
