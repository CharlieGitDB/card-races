using System;
using System.Text.Json.Serialization;

namespace PubSub.Model;

# nullable enable
public class GameEvent
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("eventType")]
  public EventType EventType { get; set; }

  [JsonPropertyName("data")]
  public EventData? Data { get; set; }
}