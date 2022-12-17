using System.Text.Json.Serialization;

namespace PubSub.Model;

public class GameContext
{
  [JsonPropertyName("group")]
  public string Group { get; set; }
  [JsonPropertyName("suit")]
  public Suit Suit { get; set; }
  [JsonPropertyName("place")]
  public int Place { get; set; } = 0;
}