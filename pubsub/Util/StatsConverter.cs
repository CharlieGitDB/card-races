
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using PubSub.Model;

#nullable enable

namespace PubSub.Util;

public class StatsConverter : JsonConverter<Dictionary<Suit, int>>
{
  public override Dictionary<Suit, int> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    if (reader.TokenType != JsonTokenType.StartObject)
    {
      throw new JsonException("Json is not object");
    }

    var value = new Dictionary<Suit, int>();

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

      string? suitString = reader.GetString();

      if (suitString == null)
      {
        throw new JsonException();
      }

      var parsed = Enum.TryParse(suitString, out Suit suit);

      if (!parsed)
      {
        throw new JsonException("Unable to parse suit value");
      }

      var parsedStat = reader.TryGetInt32(out int stat);

      if (!parsedStat)
      {
        throw new JsonException();
      }

      value.Add(suit, stat);
    }

    throw new JsonException();
  }

  public override void Write(Utf8JsonWriter writer, Dictionary<Suit, int> userData, JsonSerializerOptions options)
  {
    writer.WriteStartObject();

    foreach ((Suit suit, int stat) in userData)
    {
      writer.WritePropertyName(suit.ToString());
      writer.WriteNumberValue(stat);
    }

    writer.WriteEndObject();
  }
}