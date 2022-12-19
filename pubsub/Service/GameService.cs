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

  public GameService(CosmosClient client, ILogger logger)
  {
    Client = client;
    Logger = logger;

    var db = client.CreateDatabaseIfNotExistsAsync(GameConstants.DATABASE);

    var containerProperties = new ContainerProperties()
    {
      Id = GameConstants.CONTAINER,
      PartitionKeyPath = GameConstants.GAME_PARTITION_KEY
    };
    var container = db.Result.Database.CreateContainerIfNotExistsAsync(containerProperties);
    Container = container.Result;
  }

  public async Task<GameEntry> CreateGameAsync(string userId, Suit suit)
  {
    var gameCreateResponse = await Container.CreateItemAsync(new GameEntry
    {
      Id = IdUtil.GenerateId(),
      UserData = new() { { userId, suit } },
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

  public async Task<GameEntry> JoinGameAsync(string userId, Suit suit, GameEntry game)
  {
    game.UserData.Add(userId, suit);
    game.PickedSuits.Add(suit);

    return await UpdateGameAsync(game);
  }

  public async Task<GameEntry> StartGameAsync(GameEntry game)
  {
    game.Started = true;
    return await UpdateGameAsync(game);
  }

  // public async Task<GameEntry> NextRoundAsync(ILogger logger, GameEntry game)
  // {
  //   game.CurrentRound = game.CurrentRound + 1;

  //   Random random = new Random();
  //   int randomIndex = random.Next(game.PickedSuits.Count);
  //   Suit randomSuit = game.PickedSuits.ToArray()[randomIndex];

  //   logger.LogInformation($"Picked suit {randomSuit.ToString()}");

  //   var entry = game.Stats[randomSuit];
  //   logger.LogInformation($"Entry from stats = {JsonConvert.SerializeObject(entry)}");
  //   var updatedCount = entry + 1;

  //   logger.LogInformation($"Current count {updatedCount}");

  //   game.Stats[randomSuit] = updatedCount;

  //   logger.LogInformation($"Game {JsonConvert.SerializeObject(game)}");

  //   if (updatedCount == 10)
  //   {
  //     game.Winner = randomSuit;
  //   }
  //   return await UpdateGameAsync(game);
  // }

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