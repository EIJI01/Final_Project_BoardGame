using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}