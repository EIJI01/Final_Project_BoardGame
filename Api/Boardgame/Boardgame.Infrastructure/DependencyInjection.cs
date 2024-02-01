using Boardgame.Application.Common.interfaces.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Infrastructure.Authentication;
using Boardgame.Infrastructure.Persistence;
using Boardgame.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Boardgame.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        ConfigurationManager configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }
}