namespace Boardgame.Contracts.Authentication.Requests;

public record RefreshTokenRequest(
    string AccessToken,
    string RefreshToken);
