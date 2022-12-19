using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace PubSub.Model;

public class GameEntry
{
  [JsonPropertyName("id")]
  public string Id { get; set; }

  [JsonPropertyName("userData")]
  public Dictionary<string, Suit> UserData { get; set; } = new Dictionary<string, Suit>();

  [JsonPropertyName("pickedSuits")]
  public HashSet<Suit> PickedSuits { get; set; } = new HashSet<Suit>();

  [JsonPropertyName("started")]
  public bool Started { get; set; } = false;

  [JsonPropertyName("winner")]
  public Suit? Winner { get; set; }

  [JsonPropertyName("stats")]
  public Dictionary<Suit, int> Stats { get; set; } = InitStats();

  public string Group => Id;

  [JsonPropertyName("currentRound")]
  public int CurrentRound { get; set; }

  private static Dictionary<Suit, int> InitStats()
  {
    return Enum.GetValues<Suit>()
      .ToDictionary(suit => suit, suit => 0);
  }
}