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

namespace pubsub
{
  public static class game
  {
    [FunctionName("game")]
    public static async Task<UserEventResponse> Run(
        [WebPubSubTrigger("game", WebPubSubEventType.User, "message")] UserEventRequest request,
        string data,
        WebPubSubDataType dataType,
        [WebPubSub(Hub = "game")] IAsyncCollector<WebPubSubAction> actions)
    {
      await actions.AddAsync(WebPubSubAction.CreateSendToAllAction(
          BinaryData.FromString($"[{request.ConnectionContext.UserId}] {data}"),
          dataType));

      return new UserEventResponse
      {
        Data = BinaryData.FromString("[SYSTEM] ack"),
        DataType = WebPubSubDataType.Text
      };
    }
  }
}
