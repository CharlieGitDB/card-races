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

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("winner")]
  public Suit? Winner { get; set; }

  [JsonPropertyName("stats")]
  public Dictionary<Suit, int> Stats { get; set; } = InitStats();

  [JsonPropertyName("group")]
  public string Group => Id;

  [JsonPropertyName("currentRound")]
  public int CurrentRound { get; set; }

  public void NextRound()
  {
    CurrentRound = CurrentRound + 1;

    Random random = new Random();
    int randomIndex = random.Next(PickedSuits.Count);
    Suit randomSuit = PickedSuits.ToArray()[randomIndex];

    var updatedCount = Stats[randomSuit] + 1;
    Stats[randomSuit] = updatedCount;

    if (updatedCount == 10)
    {
      Winner = randomSuit;
    }
  }

  public Dictionary<string, Suit> GetWinningUsers(Suit winningSuit)
  {
    var userData = UserData
      .ToList()
      .Where(entry => entry.Value == winningSuit)
      .ToDictionary(entry => entry.Key, entry => entry.Value);

    return userData;
  }

  private static Dictionary<Suit, int> InitStats()
  {
    return Enum.GetValues<Suit>()
      .ToDictionary(suit => suit, suit => 0);
  }
}