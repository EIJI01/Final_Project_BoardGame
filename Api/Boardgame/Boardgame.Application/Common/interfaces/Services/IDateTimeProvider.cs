namespace Boardgame.Application.Common.interfaces.Services;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}