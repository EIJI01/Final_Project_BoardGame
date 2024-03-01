using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IJwtTokenRepository
{
    Task AddRefreshTokenAsync(RefreshToken refreshToken);
    Task UpdateRefreshTokenAsync(RefreshToken refreshToken);
    Task<RefreshToken> GetRefreshTokenFromUserIdAsync(Guid userId);
    Task<RefreshToken> GetRefreshTokenFromRefreshTokenAsync(string refreshToken);
}