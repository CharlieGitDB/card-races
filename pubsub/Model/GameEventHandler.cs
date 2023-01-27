using System;
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

  public async Task HandleCreateGame(string userId, Suit suit)
  {
    var createdGame = await _gameService.CreateGameAsync(userId, suit);
    _userContextService.UpdateGameContext(createdGame.Id, suit);
    _logger.LogInformation($"[{userId}][CREATE] Created game! |{JsonConvert.SerializeObject(createdGame)}|");
    await _actions.AddAsync(WebPubSubAction.CreateAddUserToGroupAction(userId, createdGame.Id));
  }

  public async Task HandleJoinGame(string userId, GameEntry game)
  {
    var suit = _gameEvent.Data?.Suit;
    if (suit == null)
    {
      throw new Exception("Suit is required");
    }

    if (game.Started)
    {
      throw new Exception("Game has already started");
    }
    else
    {
      var updatedGame = await _gameService.JoinGameAsync(userId, (Suit)suit, game);
      _userContextService.UpdateGameContext(updatedGame.Id, (Suit)suit);
      _logger.LogInformation($"[{userId}][JOIN] Joined game |{JsonConvert.SerializeObject(updatedGame)}|");

      await _actions.AddAsync(WebPubSubAction.CreateAddUserToGroupAction(userId, updatedGame.Id));
    }
  }

  public async Task HandleStartGame(string group, GameEntry game)
  {
    var updatedGame = await _gameService.StartGameAsync(game);

    _logger.LogInformation("[START] Starting game..");

    while (updatedGame.Winner == null)
    {
      _logger.LogInformation($"[START] Starting next round.. {updatedGame.CurrentRound}");
      updatedGame.NextRound();

      var messageData = BinaryData.FromString(JsonConvert.SerializeObject(updatedGame));
      await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(group, messageData, WebPubSubDataType.Text));
      _logger.LogInformation("[START] Round ended..");
      Thread.Sleep(2800);
    }

    var declareWinner = updatedGame.GetWinningUsers((Suit)updatedGame.Winner);
    _logger.LogInformation($"[START] |{JsonConvert.SerializeObject(declareWinner)}|");

    var winnerData = BinaryData.FromString(JsonConvert.SerializeObject(declareWinner));
    await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(group, winnerData, WebPubSubDataType.Text));

    _logger.LogInformation("[START] Game Finished");
    _logger.LogInformation("[START] Deleting game..");
    await _gameService.DeleteGameAsync(updatedGame.Id);
    _logger.LogInformation("[START] Deleted game..");
  }
}