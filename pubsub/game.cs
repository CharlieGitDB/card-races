using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;
using Microsoft.Azure.WebPubSub.Common;
using PubSub.Model;
using System.Collections.Generic;
using Microsoft.Azure.Cosmos;
using PubSub.Service;
using System.Text.Json;
using System.Text.Json.Serialization;
using PubSub.Util;

namespace PubSub
{
  public class Game
  {
    private CosmosClient _cosmosClient;
    private GameService _gameService;

    public Game(CosmosClient cosmosClient, GameService gameService)
    {
      _cosmosClient = cosmosClient;
      _gameService = gameService;
    }

    [FunctionName("game")]
    public async Task<UserEventResponse> Run(
        [WebPubSubTrigger("game", WebPubSubEventType.User, "message")] UserEventRequest request,
        BinaryData data,
        WebPubSubDataType dataType,
        WebPubSubConnectionContext connectionContext,
        [WebPubSub(Hub = "game")] IAsyncCollector<WebPubSubAction> actions,
        ILogger logger)
    {
      var userId = request.ConnectionContext.UserId;

      var gameContextService = new GameContextService(connectionContext);
      logger.LogInformation($"[{userId}][GAME CONTEXT] [{JsonConvert.SerializeObject(gameContextService)}]");

      var gameEvent = data.ToObjectFromJson<GameEvent>();
      logger.LogInformation($"[{userId}][GAME EVENT] [{JsonConvert.SerializeObject(gameEvent)}]");

      if (gameEvent.EventType == EventType.CREATE)
      {
        var suit = (Suit)gameEvent.Data.Suit;
        var createdGame = await _gameService.CreateGameAsync(userId, suit);
        logger.LogInformation($"[{userId}][CREATE] Created game! [{JsonConvert.SerializeObject(createdGame)}]");
        gameContextService.UpdateGameContext(createdGame.Id, suit);
        await actions.AddAsync(WebPubSubAction.CreateAddUserToGroupAction(userId, createdGame.Id));
      }
      else if (gameEvent.EventType == EventType.JOIN)
      {
        var (group, suit) = gameEvent.Data;
        var game = await _gameService.GetGame(group);
        if (game == null)
        {
          throw new Exception($"Game id ${group} is invalid");
        }

        logger.LogInformation($"[{userId}][GAME][GET] Found game [{JsonConvert.SerializeObject(game)}]");
        logger.LogInformation($"[{userId}][JOIN][GROUP] {group}");
        logger.LogInformation($"[{userId}][JOIN][SUIT] {suit}");
        var updatedGame = await _gameService.JoinGame(userId, suit, game);
        logger.LogInformation($"[{userId}][JOIN] Joined game [{JsonConvert.SerializeObject(updatedGame)}]");
        gameContextService.UpdateGameContext(updatedGame.Id, suit);
        await actions.AddAsync(WebPubSubAction.CreateAddUserToGroupAction(userId, updatedGame.Id));
      }
      else if (gameEvent.EventType == EventType.START)
      {
        logger.LogInformation("[{userId}][START] HIT START!");
        // to only group
        await actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(
          gameContextService.Instance.Group,
          BinaryData.FromString($"[{userId}] Group only!"),
          dataType
        ));
      }
      else
      {
        throw new Exception("Invalid event");
      }

      // // to all
      await actions.AddAsync(WebPubSubAction.CreateSendToAllAction(
          BinaryData.FromString($"[{userId}] To All! {data.ToString()}"),
          dataType));

      var userEventResponse = new UserEventResponse
      {
        Data = BinaryData.FromString("[SYSTEM] General Response"),
        DataType = WebPubSubDataType.Text,
      };

      userEventResponse.SetState(GameConstants.GAME_CONTEXT, gameContextService.Instance);

      return userEventResponse;
    }
  }
}
