using Boardgame.Application.Common.interfaces.Services;

namespace Boardgame.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;

    public DateTime UnixTimeStampToDateTime(double unixTimeStamp)
    {
        var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        dateTime = dateTime.AddSeconds(unixTimeStamp).ToUniversalTime();
        return dateTime;
    }
}