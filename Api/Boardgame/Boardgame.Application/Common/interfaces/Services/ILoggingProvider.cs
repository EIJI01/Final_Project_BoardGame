namespace Boardgame.Application.Common.interfaces.Services;

public interface ILoggingProvider
{
    Task LogInformationAsync(string message);
    Task LogWarningAsync(string message);
    Task LogErrorAsync(string message);

}