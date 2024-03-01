namespace Boardgame.Application.Authentication.Common;

public record AuthenticationWithRefreshTokenResult(
    string AccessToken,
    string RefreshToken);