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
using Microsoft.Azure.Cosmos;
using PubSub.Service;

#nullable enable

namespace PubSub;

public class Game
{
  private CosmosClient _cosmosClient;
  private GameService _gameService;

  private static ILogger? _logger;
  public Game(CosmosClient cosmosClient, GameService gameService)
  {
    _cosmosClient = cosmosClient;
    _gameService = gameService;
  }

  [FunctionName("game")]
  public async Task<UserEventResponse> Run(
      [WebPubSubTrigger("game", WebPubSubEventType.User, "message")] UserEventRequest request,
      BinaryData data,
      WebPubSubDataType dataType, // is this needed?
      WebPubSubConnectionContext connectionContext,
      [WebPubSub(Hub = "game")] IAsyncCollector<WebPubSubAction> actions,
      ILogger logger)
  {
    _logger = logger;
    _logger.LogInformation($"{dataType} .. datatype?");
    _logger.LogInformation("is working");
    var (userId, userContextService, gameEvent, gameEventHandler) = Init(connectionContext, data, _gameService, actions);
    _logger.LogInformation("is still working");
    switch (gameEvent.EventType)
    {
      case EventType.CREATE:
        var suit = gameEvent.Data?.Suit;
        if (suit == null) throw new Exception("Suit is required");

        _logger.LogInformation("Creating game..");
        await gameEventHandler.HandleCreateGame(userId, (Suit)suit);
        break;
      case EventType.JOIN:
      case EventType.START:
        var group = gameEvent.EventType == EventType.JOIN ? gameEvent.Data?.Group : userContextService.Instance.Group;
        logger.LogInformation($"[{userId}][{gameEvent.EventType.ToString()}] Group={group}");
        if (group == null) throw new Exception("Group id is required");

        var game = await _gameService.GetGameAsync(group);
        if (game == null) throw new Exception("Cannot find game");

        if (gameEvent.EventType == EventType.JOIN)
        {
          await gameEventHandler.HandleJoinGame(userId, game);
        }
        else
        {
          logger.LogInformation($"WHAT IS DATATYPE={JsonConvert.SerializeObject(dataType)}");
          await gameEventHandler.HandleStartGame(dataType, group, game);
        }
        break;
      default:
        throw new Exception("Invalid event");
    }

    // to all
    await actions.AddAsync(WebPubSubAction.CreateSendToAllAction(
        BinaryData.FromString($"[{userId}] To All! {data.ToString()}"),
        dataType));

    var userEventResponse = new UserEventResponse
    {
      Data = BinaryData.FromString("[SYSTEM] General Response"),
      DataType = WebPubSubDataType.Text,
    };
    userEventResponse.SetState(GameConstants.USER_CONTEXT, userContextService.Instance);

    return userEventResponse;
  }

  private static (string userId, UserContextService, GameEvent, GameEventHandler) Init(WebPubSubConnectionContext connectionContext, BinaryData data, GameService gameService, IAsyncCollector<WebPubSubAction> actions)
  {
    var userId = connectionContext.UserId;

    var userContextService = new UserContextService(connectionContext);
    _logger.LogInformation($"[{userId}][USER CONTEXT] |{JsonConvert.SerializeObject(userContextService.Instance)}|");

    var gameEvent = data.ToObjectFromJson<GameEvent>();
    _logger.LogInformation($"[{userId}][GAME EVENT] |{JsonConvert.SerializeObject(gameEvent)}|");

    var gameEventHandler = new GameEventHandler(_logger, actions, userContextService, gameService, gameEvent);

    return (userId, userContextService, gameEvent, gameEventHandler);
  }
}
