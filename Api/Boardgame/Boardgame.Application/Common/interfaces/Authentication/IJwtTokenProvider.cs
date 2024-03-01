using Boardgame.Application.Common.Results.Authentication;
using Boardgame.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Boardgame.Application.Common.interfaces.Authentication;

public interface IJwtTokenProvider
{
    string GenerateAccessToken(UserIdentity user, string role);
    string GenerateRefreshToken();
    JwtDecodeResult DecodeJwtSecurityTokenClaims(string accessToken);
    TokenValidationParameters RefreshTokenValidationParameters();
}