using System.Text.Json.Serialization;

namespace PubSub.Model;

public class UserContext
{
  [JsonPropertyName("group")]
  public string Group { get; set; }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("suit")]
  public Suit Suit { get; set; }
}