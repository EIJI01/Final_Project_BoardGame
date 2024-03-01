using Boardgame.Application.Common.interfaces.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Boardgame.Infrastructure.Email.Configs;

public static class ConfigEmailProvider
{
    public static IServiceCollection AddConfigEmailProvider(
        this IServiceCollection services, ConfigurationManager configuration)
    {
        services.Configure<SendGridSettings>(configuration.GetSection(SendGridSettings.SectionName));
        services.Configure<MailGunSettings>(configuration.GetSection(MailGunSettings.SectionName));
        services.AddTransient<IEmailProvider, MailGunEmailProvider>();
        return services;
    }
}