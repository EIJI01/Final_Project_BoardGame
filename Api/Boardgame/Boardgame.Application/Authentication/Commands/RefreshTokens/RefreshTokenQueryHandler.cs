using System.IdentityModel.Tokens.Jwt;
using Boardgame.Application.Authentication.Common;
using Boardgame.Application.Common.interfaces.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Common.Errors;
using ErrorOr;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace Boardgame.Application.Authentication.Commands.RefreshTokens;

public class RefreshTokenQueryHandler : IRequestHandler<RefreshTokenCommand, ErrorOr<AuthenticationWithRefreshTokenResult>>
{
    private readonly IJwtTokenProvider _jwtTokenProvider;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IJwtTokenRepository _jwtTokenRepository;
    private readonly IUserRepository _userRepository;


    public RefreshTokenQueryHandler(
        IJwtTokenProvider jwtTokenGenerator, IUserRepository userRepository,
        IDateTimeProvider dateTimeProvider, IJwtTokenRepository jwtTokenRepository)
    {
        _jwtTokenProvider = jwtTokenGenerator; _dateTimeProvider = dateTimeProvider;
        _jwtTokenRepository = jwtTokenRepository; _userRepository = userRepository;
    }

    public async Task<ErrorOr<AuthenticationWithRefreshTokenResult>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {

        var jwtToken = new JwtSecurityTokenHandler();

        var principal = jwtToken.ValidateToken(
            request.AccessToken,
            _jwtTokenProvider.RefreshTokenValidationParameters(),
            out var validateToken);

        // 1 Validate jwt header.
        if (validateToken is JwtSecurityToken jwtSecurityToken)
        {
            var result = jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase);
            if (result is false)
            {
                return Errors.Authentication.InvalidCredentials;
            }
        }

        var utcExpiryDate = long.Parse(principal.Claims.FirstOrDefault(
                p => p.Type == JwtRegisteredClaimNames.Exp)!.Value);

        var expiryDate = _dateTimeProvider.UnixTimeStampToDateTime(utcExpiryDate);

        // 2 Validate accessToken has not expired.
        if (expiryDate > _dateTimeProvider.UtcNow)
        {
            return Error.Conflict(
                code: "Invalid.TokenCredentials",
                description: "Can't refresh because the token has not expired.");
        }

        var refreshTokenExist = await _jwtTokenRepository.GetRefreshTokenFromRefreshTokenAsync(request.RefreshToken);

        // 3 Validate exist refreshToken from database
        if (refreshTokenExist is null)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        // 4 Validate expiry date of refreshToken
        if (_dateTimeProvider.UtcNow > refreshTokenExist.ExpiryDate)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        // 5 Validate if the refreshToken has been used.
        if (refreshTokenExist.IsUsed)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        var jti = principal.Claims.SingleOrDefault(j => j.Type == JwtRegisteredClaimNames.Jti)!.Value;

        // 6 Validate Jti
        if (!refreshTokenExist.JwtId.Equals(jti))
        {
            return Errors.Authentication.InvalidCredentials;
        }

        // Create new accessToken and refreshToken
        var userExist = await _userRepository.GetUserByIdAsync(refreshTokenExist.UserId)!;

        var role = await _userRepository.GetUserRoleAsync(userExist);

        var newAccessToken = _jwtTokenProvider.GenerateAccessToken(userExist, role);

        var decodeAccessToken = _jwtTokenProvider.DecodeJwtSecurityTokenClaims(newAccessToken);

        var newRefreshToken = _jwtTokenProvider.GenerateRefreshToken();

        refreshTokenExist.Token = newRefreshToken;
        refreshTokenExist.JwtId = decodeAccessToken.Jti;
        refreshTokenExist.AddedDate = _dateTimeProvider.UtcNow;
        refreshTokenExist.ExpiryDate = _dateTimeProvider.UtcNow.AddYears(1);

        await _jwtTokenRepository.UpdateRefreshTokenAsync(refreshTokenExist);

        return new AuthenticationWithRefreshTokenResult(
                AccessToken: newAccessToken,
                RefreshToken: newRefreshToken);
    }
}
