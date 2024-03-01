namespace Boardgame.Contracts.Authentication.Response;

public record AuthenticationResponse(
    Guid Id,
    string Name,
    string Email,
    string AccessToken,
    string RefreshToken);