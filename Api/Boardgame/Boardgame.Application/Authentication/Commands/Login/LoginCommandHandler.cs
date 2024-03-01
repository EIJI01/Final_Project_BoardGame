using Boardgame.Application.Authentication.Common;
using Boardgame.Application.Common.interfaces.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Common.Errors;
using ErrorOr;
using MediatR;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Application.Common.interfaces.Authentication.Persistence;

namespace Boardgame.Application.Authentication.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IJwtTokenProvider _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenRepository _jwtTokenRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IAuthentication _authentication;


    public LoginCommandHandler(
        IJwtTokenProvider jwtTokenGenerator, IUserRepository userRepository,
        IJwtTokenRepository jwtTokenRepository, IDateTimeProvider dateTimeProvider
, IAuthentication authentication
        )
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
        _jwtTokenRepository = jwtTokenRepository;
        _dateTimeProvider = dateTimeProvider;
        _authentication = authentication;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {

        // 1. Validate user exist.
        if (await _userRepository.GetUserByUsernameAsync(request.Email)! is not UserIdentity user)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        // 2. Validate the password is correct
        if (!await _authentication.UserValidatePassWordSync(user, request.Password))
        {
            return Errors.Authentication.InvalidCredentials;
        }

        //3. Create Jwt token  
        var role = await _userRepository.GetUserRoleAsync(user);
        var accessToken = _jwtTokenGenerator.GenerateAccessToken(user, role);

        //4. Create Refresh token
        var refreshTokenGenerate = _jwtTokenGenerator.GenerateRefreshToken();

        //5. Add Jwt refreshToken to database
        var tokenDecoded = _jwtTokenGenerator.DecodeJwtSecurityTokenClaims(accessToken);

        var refreshToken = new RefreshToken
        {
            JwtId = tokenDecoded.Jti,
            IsUsed = false,
            UserId = user.Id,
            AddedDate = _dateTimeProvider.UtcNow,
            ExpiryDate = _dateTimeProvider.UtcNow.AddYears(1),
            IsRevoked = false,
            Token = refreshTokenGenerate
        };



        if (await _jwtTokenRepository.GetRefreshTokenFromUserIdAsync(
            user.Id) is not RefreshToken isExistRefresh)
        {
            await _jwtTokenRepository.AddRefreshTokenAsync(refreshToken);
        }
        else
        {
            isExistRefresh.JwtId = refreshToken.JwtId;
            isExistRefresh.Token = refreshToken.Token;
            isExistRefresh.ExpiryDate = refreshToken.ExpiryDate;
            isExistRefresh.AddedDate = refreshToken.AddedDate;
            isExistRefresh.IsUsed = refreshToken.IsUsed;
            isExistRefresh.IsRevoked = refreshToken.IsRevoked;

            await _jwtTokenRepository.UpdateRefreshTokenAsync(isExistRefresh);
        }

        // await _loggingProvider.LogInformationAsync($"{user.Email} login success.");

        return new AuthenticationResult(
            User: user,
            AccessToken: accessToken,
            RefreshToken: refreshToken.Token);
    }
}