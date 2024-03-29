using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using PubSub.Util;

namespace PubSub.Model;

public class GameEntry
{
  [JsonPropertyName("id")]
  public string Id { get; set; }

  [JsonConverter(typeof(UserDataConverter))]
  [JsonPropertyName("userData")]
  public Dictionary<string, UserContext> UserData { get; set; } = new Dictionary<string, UserContext>();

  [JsonConverter(typeof(PickedSuitsConverter))]
  [JsonPropertyName("pickedSuits")]
  public HashSet<Suit> PickedSuits { get; set; } = new HashSet<Suit>();

  [JsonPropertyName("started")]
  public bool Started { get; set; } = false;

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("recentPick")]
  public Suit? RecentPick { get; set; }

  [JsonConverter(typeof(JsonStringEnumConverter))]
  [JsonPropertyName("winner")]
  public Suit? Winner { get; set; }

  [JsonConverter(typeof(StatsConverter))]
  [JsonPropertyName("stats")]
  public Dictionary<Suit, int> Stats { get; set; } = ResetStats();

  [JsonPropertyName("group")]
  public string Group => Id;

  [JsonPropertyName("currentRound")]
  public int CurrentRound { get; set; }

  public void NextRound()
  {
    CurrentRound = CurrentRound + 1;

    Suit randomSuit = GetRandomSuit();

    RecentPick = randomSuit;

    var updatedCount = Stats[randomSuit] + 1;
    Stats[randomSuit] = updatedCount;

    if (updatedCount == 10)
    {
      Winner = randomSuit;
    }
  }

  public Dictionary<string, UserContext> GetWinningUsers(Suit winningSuit)
  {
    var userData = UserData
      .ToList()
      .Where(entry => entry.Value.Suit == winningSuit)
      .ToDictionary(entry => entry.Key, entry => entry.Value);

    return userData;
  }

  public void ResetGame()
  {
    Stats = ResetStats();
    Winner = null;
    RecentPick = null;
    CurrentRound = 0;
    Started = false;
  }

  private static Dictionary<Suit, int> ResetStats()
  {
    return Enum.GetValues<Suit>()
      .ToDictionary(suit => suit, suit => 0);
  }


  private Suit GetRandomSuit()
  {
    Random random = new Random();
    int randomIndex = random.Next(PickedSuits.Count);
    return PickedSuits.ToArray()[randomIndex];
  }
}