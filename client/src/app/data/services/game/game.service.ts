import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  filter,
  map,
  of,
  Subject,
  switchAll,
  tap,
} from 'rxjs';
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

  public createdGame$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.eventType === EVENT_TYPE.CREATED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public joinedGame$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.eventType === EVENT_TYPE.JOINED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public startedGame$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.eventType === EVENT_TYPE.STARTED),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public nextRound$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.eventType === EVENT_TYPE.ADVANCE),
    map((res) => ({
      ...res,
      data: res.data as GameEntry,
    }))
  );

  public winner$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.eventType === EVENT_TYPE.WINNER),
    map((res) => ({
      ...res,
      data: res.data as Winner,
    }))
  );

  public info$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.eventType === EVENT_TYPE.INFO),
    map((res) => ({
      ...res,
      data: res.data as string | MessageData,
    }))
  );

  public everyoneScope$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.scope === SCOPE.ALL)
  );

  public userScope$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.scope === SCOPE.USER),
    map((res) => ({
      ...res,
      data: res.data as string | UserContext,
    }))
  );

  public groupScope$ = this.messages$.pipe(
    map((res) => res as Response),
    filter((res) => res.scope === SCOPE.GROUP)
  );

  public all$ = this.messages$.pipe(map((res) => res as Response));

  public connect(url: string): void {
    this.socket$ = webSocket(url);
    this.socket$
      .pipe(
        tap((data) => this.messageSubject$.next(of(data))),
        tap({
          error: (error: any) => console.error(error),
        }),
        catchError((_) => EMPTY)
      )
      .subscribe();
  }

  public createGame(suit: Suit) {
    const message: Message = {
      eventType: EVENT_TYPE.CREATE,
      data: {
        suit: suit,
      },
    };

    this.sendMessage(message);
  }

  public joinGame(group: string, suit: Suit) {
    const message: Message = {
      eventType: EVENT_TYPE.JOIN,
      data: {
        group,
        suit,
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

  private sendMessage(message: unknown) {
    this.socket$?.next(message);
  }

  public close() {
    this.socket$?.complete();
  }
}
