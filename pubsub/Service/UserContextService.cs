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
    var hasUserState = ConnectionContext.ConnectionStates.TryGetValue(GameConstants.USER_CONTEXT, out var binaryGameContext);

    if (hasUserState)
    {
      return binaryGameContext.ToObjectFromJson<UserContext>();
    }
    else
    {
      var userContext = new UserContext
      {
        Id = ConnectionContext.UserId
      };
      return userContext;
    }
  }

  public void UpdateGameContext(string group, Suit suit)
  {
    Instance.Group = group;
    Instance.Suit = suit;
  }
}