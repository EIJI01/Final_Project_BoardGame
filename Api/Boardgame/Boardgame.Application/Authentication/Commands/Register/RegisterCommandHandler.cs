using Boardgame.Application.Authentication.Common;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Common.interfaces.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IJwtTokenProvider _jwtTokenProvider;
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenRepository _jwtTokenRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IRoleRepository _roleRepository;

    public RegisterCommandHandler(
        IUserRepository userRepository,
        IJwtTokenProvider jwtTokenProvider,
        IDateTimeProvider dateTimeProvider,
        IJwtTokenRepository jwtTokenRepository,
        IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _jwtTokenProvider = jwtTokenProvider;
        _dateTimeProvider = dateTimeProvider;
        _jwtTokenRepository = jwtTokenRepository;
        _roleRepository = roleRepository;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // 1. Validate password and confirm password
        if (!request.Password.Equals(request.ConfirmPassword))
        {
            return Error.Conflict(code: "Password.Conflict", description: "Password is not match Confirm Password.");
        }

        // 2. Validate user exist.
        if (await _userRepository.GetUserByEmailAsync(request.Email)! is not null)
        {
            return Errors.User.DuplicateEmail;
        }

        // 3. Validate role exist.
        if (!await _roleRepository.RoleExistAsync(RoleKeys.Member))
        {
            return Errors.Role.NotFound;
        }

        // 4. Create user (Generate uniq Id) && persist to DB
        var user = new UserIdentity
        {
            Name = request.Name,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
            UserName = request.Email,
            PasswordHash = request.Password,
        };

        await _userRepository.Add(user);

        // 5. Add Role

        var resultRole = await _userRepository.AddUserToRoleAsync(user, RoleKeys.Member);

        if (!resultRole.Succeeded)
        {
            return Error.Failure(code: "User.FailToAddRole", description: "Can't add role to user.");
        }

        // 6. Create Jwt Token
        var role = await _userRepository.GetUserRoleAsync(user);
        var accessToken = _jwtTokenProvider.GenerateAccessToken(user, role);

        // 7. Create Jwt RefreshToken
        var refreshTokenGenerate = _jwtTokenProvider.GenerateRefreshToken();

        var tokenDecoded = _jwtTokenProvider.DecodeJwtSecurityTokenClaims(accessToken);

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

        if (await _jwtTokenRepository.GetRefreshTokenFromUserIdAsync(user.Id) is not RefreshToken isExistRefresh)
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


        return new AuthenticationResult(
            User: user,
            AccessToken: accessToken,
            RefreshToken: refreshToken.Token
        );
    }
}