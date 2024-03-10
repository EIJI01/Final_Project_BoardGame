using Boardgame.Api.Hubs.SubscribeTableDependencies;

namespace Boardgame.Api.Hubs.MiddlewareExtensions;

public static class ApplicationBuilderExtensionScoped
{
    public static void UseSqlNotificationDependency<T>(this IApplicationBuilder applicationBuilder, string connectionString)
    where T : ISubscribeNotificationDependencies
    {
        var serviceProvider = applicationBuilder.ApplicationServices;
        var service = serviceProvider.GetService<T>();
        service!.SubscribeTableDependency(connectionString);
    }
}