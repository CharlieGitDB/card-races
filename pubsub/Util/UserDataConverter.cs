
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using PubSub.Model;

#nullable enable

namespace PubSub.Util;

public class UserDataConverter : JsonConverter<Dictionary<string, Suit>>
{
  public override Dictionary<string, Suit> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    if (reader.TokenType != JsonTokenType.StartObject)
    {
      throw new JsonException("Json is not object");
    }

    var value = new Dictionary<string, Suit>();

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

      var suitString = reader.GetString();

      var parsed = Enum.TryParse(suitString, out Suit suit);

      if (!parsed)
      {
        throw new JsonException("Unable to parse suit value");
      }

      value.Add(userId, suit);
    }

    throw new JsonException();
  }

  public override void Write(Utf8JsonWriter writer, Dictionary<string, Suit> userData, JsonSerializerOptions options)
  {
    writer.WriteStartObject();

    foreach ((string userId, Suit suit) in userData)
    {
      writer.WritePropertyName(userId);
      writer.WriteStringValue(suit.ToString());
    }

    writer.WriteEndObject();
  }
}