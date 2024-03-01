using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Boardgame.Application.Common.interfaces.Authentication;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Boardgame.Application.Common.Results.Authentication;

namespace Boardgame.Infrastructure.Authentication;

public class JwtTokenProvider : IJwtTokenProvider
{
    private readonly JwtSettings _jwtSettings;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IRandomStringProvider _randomStringProvider;

    public JwtTokenProvider(
        IDateTimeProvider dateTimeProvider,
        IOptions<JwtSettings> jwtOptions,
        IRandomStringProvider randomStringProvider
        )
    {
        _dateTimeProvider = dateTimeProvider;
        _jwtSettings = jwtOptions.Value;
        _randomStringProvider = randomStringProvider;
    }

    public string GenerateAccessToken(UserIdentity user, string role)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]{
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.GivenName, user.Name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("role", role),
        };

        var securityToken = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            expires: _dateTimeProvider.UtcNow.AddSeconds(_jwtSettings.ExpiryMinutes),
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
    public JwtDecodeResult DecodeJwtSecurityTokenClaims(string accessToken)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(accessToken);
        return new JwtDecodeResult(
            Sub: jwtSecurityToken.Claims.First(s => s.Type == "sub").Value,
            GivenName: jwtSecurityToken.Claims.First(g => g.Type == "given_name").Value,
            Jti: jwtSecurityToken.Claims.First(j => j.Type == "jti").Value,
            Role: jwtSecurityToken.Claims.First(r => r.Type == "role").Value,
            Expires: jwtSecurityToken.Claims.First(ex => ex.Type == "exp").Value,
            Issuer: jwtSecurityToken.Claims.First(i => i.Type == "iss").Value,
            Audience: jwtSecurityToken.Claims.First(a => a.Type == "aud").Value);
    }

    public string GenerateRefreshToken()
    {
        var token = _randomStringProvider.RandomString(30);

        return token;
    }
    public TokenValidationParameters RefreshTokenValidationParameters()
    {
        return new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _jwtSettings.Issuer,
            ValidAudience = _jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
            ClockSkew = TimeSpan.Zero
        };
    }
}
