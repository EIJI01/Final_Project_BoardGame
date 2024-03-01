namespace Boardgame.Api.Common.Cors;

public static class ConfigCorsPolicy
{
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(o => o.AddPolicy(
        CorsPolicyKeys.MyPolicy, builder =>
        {
            builder.AllowAnyHeader()
                   .AllowAnyMethod()
                   .SetIsOriginAllowed((host) => true)
                   .AllowCredentials();
        }));
        return services;
    }
}