using Boardgame.Api.Common.Cors;
using Boardgame.Api.Common.Errors;
using Boardgame.Api.Common.Mapping;
using Boardgame.Api.Hubs;
using Boardgame.Api.Hubs.SubscribeTableDependencies;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Boardgame.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddMappings();
        services.AddControllers();
        services.AddSingleton<ProblemDetailsFactory, BoardgameProblemDetailsFactory>();
        services.AddSignalR();
        services.AddSingleton<DatabaseTracking>();
        services.AddSingleton<NotificationHub>();
        services.AddSingleton<SubscribeScanSystemTableDependency>();
        services.AddSingleton<SubscribeCardTableDependency>();
        services.AddSingleton<SubscribeTablesDependency>();
        services.AddSingleton<SubscribeQueueDependency>();
        services.AddSingleton<SubscribeNotificationDependency>();
        services.AddCorsPolicy();

        return services;

    }
}