
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using PubSub.Model;

#nullable enable

namespace PubSub.Util;

public class UserDataConverter : JsonConverter<Dictionary<string, UserContext>>
{
  public override Dictionary<string, UserContext> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    if (reader.TokenType != JsonTokenType.StartObject)
    {
      throw new JsonException("Json is not object");
    }

    var value = new Dictionary<string, UserContext>();

    while (reader.Read())
    {
      if (reader.TokenType == JsonTokenType.EndObject)
      {
        return value;
      }

      if (reader.TokenType != JsonTokenType.PropertyName)
      {
        throw new JsonException();
      }

      string? userId = reader.GetString();

      if (userId == null)
      {
        throw new JsonException();
      }

      var userContextString = reader.GetString();

      if (userContextString == null)
      {
        throw new JsonException("Unable to parse user context");
      }

      UserContext? parsed = JsonSerializer.Deserialize<UserContext>(userContextString);

      if (parsed == null)
      {
        throw new JsonException("Unable to parse user context");
      }

      value.Add(userId, parsed);
    }

    throw new JsonException();
  }

  public override void Write(Utf8JsonWriter writer, Dictionary<string, UserContext> userData, JsonSerializerOptions options)
  {
    writer.WriteStartObject();

    foreach ((string userId, UserContext userContext) in userData)
    {
      writer.WritePropertyName(userId);

      writer.WriteStartObject();

      writer.WritePropertyName("id");
      writer.WriteStringValue(userId);

      writer.WritePropertyName("group");
      writer.WriteStringValue(userContext.Group);

      writer.WritePropertyName("suit");
      writer.WriteStringValue(userContext.Suit.ToString());

      writer.WritePropertyName("nickname");
      writer.WriteStringValue(userContext.NickName);

      writer.WriteEndObject();
    }

    writer.WriteEndObject();
  }
}