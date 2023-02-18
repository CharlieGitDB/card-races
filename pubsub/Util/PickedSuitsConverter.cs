
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using PubSub.Model;

namespace PubSub.Util;

public class PickedSuitsConverter : JsonConverter<HashSet<Suit>>
{
  public override HashSet<Suit> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    if (reader.TokenType != JsonTokenType.StartArray)
    {
      throw new JsonException("Json is not array");
    }

    var value = new HashSet<Suit>();

    while (reader.Read())
    {
      if (reader.TokenType == JsonTokenType.EndArray)
      {
        return value;
      }

      if (reader.TokenType != JsonTokenType.String)
      {
        throw new JsonException("Picked suit value is not a string");
      }

      var suitString = reader.GetString();

      var parsed = Enum.TryParse(suitString, out Suit suit);

      if (!parsed)
      {
        throw new JsonException("Unable to parse suit value");
      }

      value.Add(suit);
    }

    throw new JsonException();
  }

  public override void Write(Utf8JsonWriter writer, HashSet<Suit> hashset, JsonSerializerOptions options)
  {
    writer.WriteStartArray();

    foreach (var entry in hashset)
    {
      var enumStringValue = entry.ToString();
      writer.WriteStringValue(enumStringValue);
    }

    writer.WriteEndArray();
  }
}