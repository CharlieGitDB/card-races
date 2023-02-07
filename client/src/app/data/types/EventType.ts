export type EventType =
  | 'CREATE'
  | 'JOIN'
  | 'START'
  | 'ADVANCE'
  | 'WINNER'
  | 'REPLAY'
  | 'INFO';

export const EVENT_TYPE: Record<EventType, EventType> = {
  CREATE: 'CREATE',
  JOIN: 'JOIN',
  START: 'START',
  ADVANCE: 'ADVANCE',
  WINNER: 'WINNER',
  REPLAY: 'REPLAY',
  INFO: 'INFO',
};
