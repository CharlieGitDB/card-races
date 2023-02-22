import { EventType } from './EventType';
import { GameEntry } from './GameEntry';
import { MessageData } from './MessageData';
import { Scope } from './Scope';
import { Winner } from './Winner';

export interface Response {
  scope: Scope;
  eventType: EventType;
  data: GameEntry | MessageData | Winner | string;
}
