using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
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
      WebPubSubConnectionContext connectionContext,
      [WebPubSub(Hub = "game")] IAsyncCollector<WebPubSubAction> actions,
      ILogger logger)
  {
    _logger = logger;
    var (userId, userContextService, gameEvent, gameEventHandler, errorService) = Init(connectionContext, data, _gameService, actions);

    switch (gameEvent.EventType)
    {
      case EventType.CREATE:
        var suit = gameEvent.Data?.Suit;
        if (suit == null)
        {
          await errorService.sendUserError(userId, "Suit is required");
          break;
        }

        var nickname = gameEvent.Data?.NickName;
        if (nickname == null)
        {
          await errorService.sendUserError(userId, "Nickname is required");
          break;
        }

        await gameEventHandler.HandleCreateGame(userId, (Suit)suit, nickname);
        break;
      case EventType.JOIN:
      case EventType.START:
      case EventType.REPLAY:
        var group = gameEvent.EventType == EventType.JOIN ? gameEvent.Data?.Group : userContextService.Instance.Group;

        if (group == null)
        {
          await errorService.sendUserError(userId, "Group id is required");
          break;
        }


        GameEntry? game = null;
        try
        {
          game = await _gameService.GetGameAsync(group);
        }
        catch (Exception e)
        {
          _logger.LogError($"{JsonConvert.SerializeObject(e)}");
        }

        if (game == null)
        {
          await errorService.sendUserError(userId, "Cannot find game");
          break;
        }

        if (gameEvent.EventType == EventType.JOIN)
        {
          await gameEventHandler.HandleJoinGame(userId, game);
        }
        else if (gameEvent.EventType == EventType.START)
        {
          await gameEventHandler.HandleStartGame(group, game);
        }
        else
        {
          await gameEventHandler.HandleReplayGame(group, game);
        }
        break;
      default:
        await errorService.sendUserError(userId, "Invalid event type");
        break;
    }

    var userResponse = new Response
    {
      Scope = Scope.USER,
      EventType = EventType.INFO,
      Data = userContextService.Instance
    };
    var userEventResponse = new UserEventResponse
    {
      Data = BinaryData.FromObjectAsJson(userResponse),
      DataType = WebPubSubDataType.Json,
    };
    userEventResponse.SetState(GameConstants.USER_CONTEXT, userContextService.Instance);

    return userEventResponse;
  }

  private static (string userId, UserContextService, GameEvent, GameEventHandler, ErrorService) Init(WebPubSubConnectionContext connectionContext, BinaryData data, GameService gameService, IAsyncCollector<WebPubSubAction> actions)
  {
    var userId = connectionContext.UserId;

    var userContextService = new UserContextService(connectionContext);
    _logger.LogInformation($"[{userId}][USER CONTEXT] |{JsonConvert.SerializeObject(userContextService.Instance)}|");

    _logger.LogInformation($"[{userId}][DATA] |{JsonConvert.SerializeObject(data)}|");

    var gameEvent = data.ToObjectFromJson<GameEvent>();
    _logger.LogInformation($"[{userId}][GAME EVENT] |{JsonConvert.SerializeObject(gameEvent)}|");

    var errorService = new ErrorService(actions);

    var gameEventHandler = new GameEventHandler(_logger, actions, userContextService, gameService, gameEvent, errorService);

    return (userId, userContextService, gameEvent, gameEventHandler, errorService);
  }
}
