using Boardgame.Api.Common.Errors;
using Boardgame.Api.Common.Http;
using Boardgame.Api.Common.Mapping;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Boardgame.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddMappings();
        services.AddControllers();
        services.AddSingleton<ProblemDetailsFactory, BoardgameProblemDetailsFactory>();
        services.AddCors(o => o.AddPolicy(
        MyPolicyKeys.MyPolicy, builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        }));
        return services;

    }
}