using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PubSub.Model;

public class GameEntry
{
  [JsonPropertyName("id")]
  public string Id { get; set; }

  [JsonPropertyName("users")]
  public List<string> Users = new List<string>();
  [JsonPropertyName("suits")]
  public List<Suit> Suits = new List<Suit>();

  public string Group => Id;
}