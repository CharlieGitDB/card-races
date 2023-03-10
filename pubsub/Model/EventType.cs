namespace PubSub.Model;

public enum EventType
{
  CREATE,
  CREATED,
  JOIN,
  JOINED,
  START,
  STARTED,
  ADVANCE,
  WINNER,
  REPLAY,
  RESTARTED,
  INFO,
  ERROR
}