using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;

namespace pubsub
{
  public static class negotiate
  {
    [FunctionName("negotiate")]
    public static WebPubSubConnection Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
        [WebPubSubConnection(Hub = "game", UserId = "{query.username}")] WebPubSubConnection connection,
        ILogger log)
    {
      log.LogInformation("Connecting...");
      return connection;
    }
  }
}
