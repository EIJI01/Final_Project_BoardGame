using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Boardgame.Infrastructure.Persistence.Database;

public static class ConfigDataContext
{
    public static IServiceCollection AddConfigDataContext(
        this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddDbContext<DataContext>(
            options => options.UseSqlServer(
                configuration
                .GetConnectionString(
                "DefaultConnection")));

        return services;
    }
}