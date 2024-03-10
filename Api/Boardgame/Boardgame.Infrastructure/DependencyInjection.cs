using Boardgame.Application.Common.interfaces.Authentication.Persistence;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Infrastructure.Authentication;
using Boardgame.Infrastructure.Email.Configs;
using Boardgame.Infrastructure.Persistence.Database;
using Boardgame.Infrastructure.Persistence.Repositories;
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
        services.AddConfigDataContext(configuration);
        services.AddAuth(configuration);
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddSingleton<IRandomStringProvider, RandomStringProvider>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddConfigEmailProvider(configuration);
        services.AddScoped<IAuthentication, AuthenticationRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IBranchRepository, BranchRepository>();
        services.AddScoped<IWorkRepository, WorkRepository>();
        services.AddScoped<ITableRepository, TableRepository>();
        services.AddScoped<IScanSystemRepository, ScanSystemRepository>();
        services.AddScoped<ICardRepository, CardRepository>();
        services.AddScoped<IQueueRepository, QueueRepository>();
        services.AddScoped<INotificationRepository, NotificationRepository>();
        services.AddScoped<ISaveFileProvider, SaveFileProvider>();

        return services;
    }
}