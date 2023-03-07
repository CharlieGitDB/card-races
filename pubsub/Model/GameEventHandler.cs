using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;
using Microsoft.Azure.WebPubSub.Common;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PubSub.Service;

namespace PubSub.Model;

public class GameEventHandler
{
  private ILogger _logger;
  private IAsyncCollector<WebPubSubAction> _actions;
  private UserContextService _userContextService;
  private GameEvent _gameEvent;
  private GameService _gameService;

  public GameEventHandler(ILogger logger, IAsyncCollector<WebPubSubAction> actions, UserContextService userContextService, GameService gameService, GameEvent gameEvent)
  {
    _logger = logger;
    _actions = actions;
    _userContextService = userContextService;
    _gameService = gameService;
    _gameEvent = gameEvent;
  }

  public async Task HandleCreateGame(string userId, Suit suit, string nickname)
  {
    var createdGame = await _gameService.CreateGameAsync(userId, suit, nickname);
    _userContextService.UpdateGameContext(createdGame.Id, suit, nickname);
    _logger.LogInformation($"[{userId}][CREATE] Created game! |{JsonConvert.SerializeObject(createdGame)}|");
    await _actions.AddAsync(WebPubSubAction.CreateAddUserToGroupAction(userId, createdGame.Id));
    await sendGameCreated(createdGame);
  }

  public async Task HandleJoinGame(string userId, GameEntry game)
  {
    var suit = _gameEvent.Data?.Suit;
    var nickname = _gameEvent.Data?.NickName;

    if (suit == null)
    {
      throw new Exception("Suit is required");
    }

    if (nickname == null)
    {
      throw new Exception("Nickname is required");
    }

    if (game.Started)
    {
      throw new Exception("Game has already started");
    }
    else
    {
      var updatedGame = await _gameService.JoinGameAsync(userId, (Suit)suit, nickname, game);
      _userContextService.UpdateGameContext(updatedGame.Id, (Suit)suit, nickname);
      _logger.LogInformation($"[{userId}][JOIN] Joined game |{JsonConvert.SerializeObject(updatedGame)}|");

      await _actions.AddAsync(WebPubSubAction.CreateAddUserToGroupAction(userId, updatedGame.Id));
      await sendGameJoined(updatedGame);
    }
  }

  public async Task HandleStartGame(string group, GameEntry game)
  {
    var updatedGame = await _gameService.StartGameAsync(game);
    await sendGameStarted(updatedGame);

    _logger.LogInformation("[START] Starting game..");

    Thread.Sleep(1500);
    while (updatedGame.Winner == null)
    {
      _logger.LogInformation($"[START] Starting next round.. {updatedGame.CurrentRound}");
      updatedGame.NextRound();
      await sendNextRound(group, updatedGame);
      _logger.LogInformation("[START] Round ended..");
      Thread.Sleep(3000);
    }

    var declareWinner = updatedGame.GetWinningUsers((Suit)updatedGame.Winner);
    _logger.LogInformation($"[START] |{JsonConvert.SerializeObject(declareWinner)}|");
    await sendGameWinner(group, declareWinner);

    _logger.LogInformation("[START] Game Finished");
  }

  public async Task HandleReplayGame(string group, GameEntry game)
  {
    var restartedGame = await _gameService.ReplayGameAsync(game);
    _logger.LogInformation($"[{group}][REPLAY] Game has been reset |{JsonConvert.SerializeObject(restartedGame)}|");

    await sendGameRestarted(group, game);
  }

  private async Task sendGameRestarted(string group, GameEntry restartedGame)
  {
    var restartedGameResponse = new Response
    {
      Scope = Scope.GROUP,
      EventType = EventType.RESTARTED,
      Data = restartedGame
    };
    var messageData = BinaryData.FromObjectAsJson(restartedGameResponse);
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(group, messageData, WebPubSubDataType.Json));
  }

  private async Task sendGameWinner(string group, Dictionary<string, UserContext> declareWinner)
  {
    var winnerResponse = new Response
    {
      Scope = Scope.GROUP,
      EventType = EventType.WINNER,
      Data = declareWinner
    };
    var messageData = BinaryData.FromObjectAsJson(winnerResponse);
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(group, messageData, WebPubSubDataType.Json));
  }

  private async Task sendNextRound(string group, GameEntry updatedGame)
  {
    var updatedGameResponse = new Response
    {
      Scope = Scope.GROUP,
      EventType = EventType.ADVANCE,
      Data = updatedGame
    };
    var messageData = BinaryData.FromObjectAsJson(updatedGameResponse);
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(group, messageData, WebPubSubDataType.Json));
  }

  private async Task sendGameCreated(GameEntry createdGame)
  {
    var createdGameResponse = new Response
    {
      Scope = Scope.GROUP,
      EventType = EventType.CREATED,
      Data = createdGame
    };
    var messageData = BinaryData.FromObjectAsJson(createdGameResponse);
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(createdGame.Group, messageData, WebPubSubDataType.Json));
  }

  private async Task sendGameJoined(GameEntry updatedGame)
  {
    var joinedGameResponse = new Response
    {
      Scope = Scope.GROUP,
      EventType = EventType.JOINED,
      Data = updatedGame
    };
    var messageData = BinaryData.FromObjectAsJson(joinedGameResponse);
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(updatedGame.Group, messageData, WebPubSubDataType.Json));
  }

  private async Task sendGameStarted(GameEntry updatedGame)
  {
    var startedGameResponse = new Response
    {
      Scope = Scope.GROUP,
      EventType = EventType.STARTED,
      Data = updatedGame
    };
    var messageData = BinaryData.FromObjectAsJson(startedGameResponse);
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(updatedGame.Group, messageData, WebPubSubDataType.Json));
  }
}