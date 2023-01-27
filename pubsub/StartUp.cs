using System;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using PubSub.Service;

[assembly: FunctionsStartup(typeof(PubSub.Startup))]
namespace PubSub;

public class Startup : FunctionsStartup
{
  public override void Configure(IFunctionsHostBuilder builder)
  {
    builder.Services.AddSingleton((s) =>
    {
      CosmosClientBuilder cosmosClientBuilder = new CosmosClientBuilder(Environment.GetEnvironmentVariable("CosmosDbConnectionString"));

      var serializerOptions = new CosmosSerializationOptions();
      serializerOptions.IgnoreNullValues = true;
      serializerOptions.PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase;

      return cosmosClientBuilder
        .WithSerializerOptions(serializerOptions)
        .Build();
    });

    builder.Services.AddScoped<GameService>();
  }
}