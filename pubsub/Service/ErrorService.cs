using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;
using Microsoft.Azure.WebPubSub.Common;
using PubSub.Model;

#nullable enable

namespace PubSub.Service;

public class ErrorService
{
  private IAsyncCollector<WebPubSubAction> _actions;

  public ErrorService(IAsyncCollector<WebPubSubAction> actions)
  {
    _actions = actions;
  }

  public async Task sendUserError(string userId, string message)
  {
    await sendError(Scope.USER, message, userId);
  }

  public async Task sendGroupError(string group, string message)
  {
    await sendError(Scope.GROUP, message, group: group);
  }

  public async Task sendErrorToAll(string message)
  {
    await sendError(Scope.ALL, message);
  }

  private async Task sendError(Scope scope, string message, string? userId = null, string? group = null)
  {
    var errorResponse = new Response
    {
      Scope = scope,
      EventType = EventType.ERROR,
      Data = message
    };
    var messageData = BinaryData.FromObjectAsJson(errorResponse);

    switch (scope)
    {
      case Scope.ALL:
        await _actions.AddAsync(WebPubSubAction.CreateSendToAllAction(messageData, WebPubSubDataType.Json));
        break;
      case Scope.GROUP:
        await _actions.AddAsync(WebPubSubAction.CreateSendToGroupAction(group, messageData, WebPubSubDataType.Json));
        break;
      case Scope.USER:
        await _actions.AddAsync(WebPubSubAction.CreateSendToUserAction(userId, messageData, WebPubSubDataType.Json));
        break;
      default:
        break;
    }
  }
}