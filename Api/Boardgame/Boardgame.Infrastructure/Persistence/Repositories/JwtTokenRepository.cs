using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class JwtTokenRepository : IJwtTokenRepository
{
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly DataContext _dataContext;
    public JwtTokenRepository(IDateTimeProvider dateTimeProvider, DataContext dataContext)
    {
        _dateTimeProvider = dateTimeProvider;
        _dataContext = dataContext;
    }

    public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
    {
        await _dataContext.RefreshTokens!.AddAsync(refreshToken);
        await _dataContext.SaveChangesAsync();
    }
    public async Task UpdateRefreshTokenAsync(RefreshToken refreshToken)
    {
        _dataContext.RefreshTokens!.Update(refreshToken);
        await _dataContext.SaveChangesAsync();
    }
    public async Task<RefreshToken> GetRefreshTokenFromUserIdAsync(Guid userId)
    {
        var refresh = await _dataContext.RefreshTokens!.FirstOrDefaultAsync(r => r.UserId == userId);
        return refresh!;
    }
    public async Task<RefreshToken> GetRefreshTokenFromRefreshTokenAsync(string refreshToken)
    {
        var refresh = await _dataContext.RefreshTokens!.FirstOrDefaultAsync(r => r.Token == refreshToken);
        return refresh!;
    }

}
