using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using PubSub.Model;
using PubSub.Util;

namespace PubSub.Service;

public class GameService
{

  private CosmosClient Client { get; set; }

  private Container Container { get; set; }

  private ILogger Logger;

  private readonly int ONE_DAY = 86400;

  public GameService(CosmosClient client, ILogger logger)
  {
    Client = client;
    Logger = logger;

    var db = client.CreateDatabaseIfNotExistsAsync(GameConstants.DATABASE);

    var containerProperties = new ContainerProperties()
    {
      Id = GameConstants.CONTAINER,
      PartitionKeyPath = GameConstants.GAME_PARTITION_KEY,
      DefaultTimeToLive = ONE_DAY
    };
    var container = db.Result.Database.CreateContainerIfNotExistsAsync(containerProperties);
    Container = container.Result;
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

    var gameCreateResponse = await Container.CreateItemAsync(new GameEntry
    {
      Id = groupId,
      UserData = new() { { userId, userContext } },
      PickedSuits = new() { suit }
    });

    return gameCreateResponse.Resource;
  }

  public async Task<GameEntry> GetGameAsync(string group)
  {
    try
    {
      var gameGetResponse = await Container.ReadItemAsync<GameEntry>(group, new PartitionKey(group));
      return gameGetResponse;
    }
    catch (CosmosException e)
    {
      // this just means that the game was not found
      // return null instead of exception
      if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
      {
        return null;
      }
      else
      {
        throw e;
      }
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

  private async Task<GameEntry> UpdateGameAsync(GameEntry game)
  {
    var updateGameResponse = await Container.UpsertItemAsync<GameEntry>(game);
    return updateGameResponse.Resource;
  }

  public async Task DeleteGameAsync(string group)
  {
    var deleteGameResponse = await Container.DeleteItemAsync<GameEntry>(group, new PartitionKey(group));
  }
}