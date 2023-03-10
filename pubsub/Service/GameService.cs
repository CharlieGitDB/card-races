using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using PubSub.Model;
using PubSub.Util;

#nullable enable

namespace PubSub.Service;

public class GameService
{

  private CosmosClient _client { get; set; }

  private Container _container { get; set; }

  private ILogger _logger;

  private readonly int ONE_DAY = 86400;

  public GameService(CosmosClient client, ILogger logger)
  {
    _client = client;
    _logger = logger;

    var db = client.CreateDatabaseIfNotExistsAsync(GameConstants.DATABASE);

    var containerProperties = new ContainerProperties()
    {
      Id = GameConstants.CONTAINER,
      PartitionKeyPath = GameConstants.GAME_PARTITION_KEY,
      DefaultTimeToLive = ONE_DAY
    };
    var container = db.Result.Database.CreateContainerIfNotExistsAsync(containerProperties);
    _container = container.Result;
  }

  public async Task<GameEntry> CreateGameAsync(string userId, Suit suit, string nickname)
  {
    var groupId = IdUtil.GenerateId();
    var userContext = new UserContext
    {
      Id = userId,
      Group = groupId,
      Suit = suit,
      NickName = nickname
    };

    var gameCreateResponse = await _container.CreateItemAsync(new GameEntry
    {
      Id = groupId,
      UserData = new() { { userId, userContext } },
      PickedSuits = new() { suit }
    });

    return gameCreateResponse.Resource;
  }

  public async Task<GameEntry?> GetGameAsync(string group)
  {
    try
    {
      var game = await _container.ReadItemAsync<GameEntry>(group, new PartitionKey(group));
      return game;
    }
    catch (Exception e)
    {
      _logger.LogError($"[GAME][ERROR] Error while getting game from db.. {JsonSerializer.Serialize(e)}");
      return null;
    }
  }


  public async Task<GameEntry> JoinGameAsync(string userId, Suit suit, string nickname, GameEntry game)
  {
    var userContext = new UserContext
    {
      Id = userId,
      Group = game.Id,
      Suit = suit,
      NickName = nickname
    };

    game.UserData.Add(userId, userContext);
    game.PickedSuits.Add(suit);

    return await UpdateGameAsync(game);
  }

  public async Task<GameEntry> StartGameAsync(GameEntry game)
  {
    game.Started = true;
    return await UpdateGameAsync(game);
  }

  public async Task<GameEntry> ReplayGameAsync(GameEntry game)
  {
    game.ResetGame();
    return await UpdateGameAsync(game);
  }

  private async Task<GameEntry> UpdateGameAsync(GameEntry game)
  {
    var updateGameResponse = await _container.UpsertItemAsync<GameEntry>(game);
    return updateGameResponse.Resource;
  }

  public async Task DeleteGameAsync(string group)
  {
    var deleteGameResponse = await _container.DeleteItemAsync<GameEntry>(group, new PartitionKey(group));
  }
}