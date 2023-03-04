using System.Text.Json.Serialization;

namespace PubSub.Model;

# nullable enable

public class EventData
{
  [JsonPropertyName("group")]
  public string? Group { get; set; }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("suit")]
  public Suit? Suit { get; set; }

  [JsonPropertyName("nickname")]
  public string? NickName { get; set; }
}