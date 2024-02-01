using Boardgame.Application.Common.interfaces.Services;

namespace Boardgame.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;

}