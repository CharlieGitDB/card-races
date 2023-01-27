using System.Text.Json.Serialization;

namespace PubSub.Model;

# nullable enable
public class GameEvent
{
  [JsonPropertyName("eventType")]
  public EventType EventType { get; set; }

  [JsonPropertyName("data")]
  public EventData? Data { get; set; }
}