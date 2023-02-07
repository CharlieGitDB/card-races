using System.Text.Json.Serialization;

namespace PubSub.Model;

# nullable enable

public class Response
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("scope")]
  public Scope Scope { get; set; }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("eventType")]
  public EventType EventType { get; set; }

  [JsonPropertyName("data")]
  public dynamic? Data { get; set; }
}