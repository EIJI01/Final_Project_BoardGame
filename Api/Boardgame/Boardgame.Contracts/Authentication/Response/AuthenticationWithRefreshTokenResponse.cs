namespace Boardgame.Contracts.Authentication.Response;

public record AuthenticationWithRefreshTokenResponse(
    string AccessToken,
    string RefreshToken);