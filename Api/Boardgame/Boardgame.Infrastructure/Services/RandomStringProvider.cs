using Boardgame.Application.Common.interfaces.Services;

namespace Boardgame.Infrastructure.Services;

public class RandomStringProvider : IRandomStringProvider
{
    public string RandomString(int length)
    {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678";
        return new string(Enumerable.Repeat(chars, length)
            .Select(c => c[new Random().Next(c.Length)]).ToArray());
    }
}
