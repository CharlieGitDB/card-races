using System.Text.Json.Serialization;

namespace PubSub.Model;

# nullable enable

public class EventData
{
  [JsonPropertyName("group")]
  public string? Group { get; set; }
  [JsonPropertyName("suit")]
  public Suit? Suit { get; set; }

  internal void Deconstruct(out string? group, out Suit? suit)
  {
    group = Group;
    suit = Suit;
  }
}