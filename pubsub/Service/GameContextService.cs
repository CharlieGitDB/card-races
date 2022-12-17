using Microsoft.Azure.WebPubSub.Common;
using PubSub.Model;

namespace PubSub.Service;

public class GameContextService
{
  private WebPubSubConnectionContext ConnectionContext { get; set; }
  public GameContext Instance { get; private set; }

  public GameContextService(WebPubSubConnectionContext connectionContext)
  {
    ConnectionContext = connectionContext;
    Instance = GetGameContext();
  }
  private GameContext GetGameContext()
  {
    var hasGameState = ConnectionContext.ConnectionStates.TryGetValue(GameConstants.GAME_CONTEXT, out var binaryGameContext);

    if (hasGameState)
    {
      return binaryGameContext.ToObjectFromJson<GameContext>();
    }
    else
    {
      return new GameContext();
    }
  }

  public void UpdateGameContext(string group, Suit suit)
  {
    Instance.Group = group;
    Instance.Suit = suit;
  }
}