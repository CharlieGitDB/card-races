using Microsoft.Azure.WebPubSub.Common;
using PubSub.Model;

namespace PubSub.Service;

public class UserContextService
{
  private WebPubSubConnectionContext ConnectionContext { get; set; }
  public UserContext Instance { get; private set; }

  public UserContextService(WebPubSubConnectionContext connectionContext)
  {
    ConnectionContext = connectionContext;
    Instance = GetContext();
  }
  private UserContext GetContext()
  {
    var hasGameState = ConnectionContext.ConnectionStates.TryGetValue(GameConstants.USER_CONTEXT, out var binaryGameContext);

    if (hasGameState)
    {
      return binaryGameContext.ToObjectFromJson<UserContext>();
    }
    else
    {
      return new UserContext();
    }
  }

  public void UpdateGameContext(string group, Suit suit)
  {
    Instance.Group = group;
    Instance.Suit = suit;
  }
}