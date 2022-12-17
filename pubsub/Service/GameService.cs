using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Azure.Core;
using Microsoft.Azure.Cosmos;
using PubSub.Model;
using PubSub.Util;

namespace PubSub.Service;

public class GameService
{

  private CosmosClient Client { get; set; }

  private Container Container { get; set; }

  public GameService(CosmosClient client)
  {
    Client = client;

    var db = client.CreateDatabaseIfNotExistsAsync(GameConstants.DATABASE);

    var containerProperties = new ContainerProperties()
    {
      Id = GameConstants.CONTAINER,
      PartitionKeyPath = GameConstants.GAME_PARTITION_KEY
    };
    var container = db.Result.Database.CreateContainerIfNotExistsAsync(containerProperties);
    Container = container.Result;
  }

  // group will be shortid
  public async Task<GameEntry> CreateGameAsync(string userId, Suit suit)
  {
    var gameCreateResponse = await Container.CreateItemAsync(new GameEntry
    {
      Id = IdUtil.GenerateId(),
      Users = new() { userId },
      Suits = new() { suit }
    });

    return gameCreateResponse.Resource;
  }

  // group will be shortid
  public async Task<GameEntry> GetGame(string group)
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

  public async Task<GameEntry> JoinGame(string userId, Suit suit, GameEntry game)
  {
    game.Users.Add(userId);

    if (!game.Suits.Contains(suit))
    {
      game.Suits.Add(suit);
    }

    return await UpdateGame(game);
  }

  // group will be shortid
  private async Task<GameEntry> UpdateGame(GameEntry game)
  {
    var updateGameResponse = await Container.UpsertItemAsync<GameEntry>(game);
    return updateGameResponse.Resource;
  }
}