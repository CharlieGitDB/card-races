import { EventType } from './EventType';
import { MessageData } from './MessageData';

export interface Message {
  eventType: EventType;
  data?: MessageData;
}
