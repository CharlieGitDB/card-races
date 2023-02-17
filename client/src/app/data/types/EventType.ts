export type EventType =
  | 'CREATE'
  | 'CREATED'
  | 'JOIN'
  | 'JOINED'
  | 'START'
  | 'STARTED'
  | 'ADVANCE'
  | 'WINNER'
  | 'REPLAY'
  | 'INFO';

export const EVENT_TYPE: Record<EventType, EventType> = {
  CREATE: 'CREATE',
  CREATED: 'CREATED',
  JOIN: 'JOIN',
  JOINED: 'JOINED',
  START: 'START',
  STARTED: 'STARTED',
  ADVANCE: 'ADVANCE',
  WINNER: 'WINNER',
  REPLAY: 'REPLAY',
  INFO: 'INFO',
};
