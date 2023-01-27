using shortid;
using shortid.Configuration;

namespace PubSub.Util;

public static class IdUtil
{
  public static string GenerateId()
  {
    var options = new GenerationOptions(false, false, 8);
    return ShortId.Generate(options).ToLower();
  }
}