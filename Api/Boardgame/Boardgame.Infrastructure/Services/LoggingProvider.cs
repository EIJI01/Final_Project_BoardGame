using Boardgame.Application.Common.interfaces.Services;
using Microsoft.Extensions.Logging;

namespace Boardgame.Infrastructure.Services;

public class LoggingProvider : ILoggingProvider
{
    private readonly ILogger _logger;

    public LoggingProvider(ILogger logger)
    {
        _logger = logger;
    }

    public async Task LogErrorAsync(string message)
    {
        await Task.CompletedTask;
#pragma warning disable CA2254 // Template should be a static expression
        _logger.LogError(message);
#pragma warning restore CA2254 // Template should be a static expression
    }

    public async Task LogInformationAsync(string message)
    {
        await Task.CompletedTask;
#pragma warning disable CA2254 // Template should be a static expression
        _logger.LogInformation(message);
#pragma warning restore CA2254 // Template should be a static expression
    }

    public async Task LogWarningAsync(string message)
    {
        await Task.CompletedTask;
#pragma warning disable CA2254 // Template should be a static expression
        _logger.LogWarning(message);
#pragma warning restore CA2254 // Template should be a static expression
    }
}
