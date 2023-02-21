using System.Text.Json.Serialization;

namespace PubSub.Model;

public class UserContext
{
  [JsonPropertyName("id")]
  public string Id { get; set; }

  [JsonPropertyName("group")]
  public string Group { get; set; }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("suit")]
  public Suit Suit { get; set; }
}