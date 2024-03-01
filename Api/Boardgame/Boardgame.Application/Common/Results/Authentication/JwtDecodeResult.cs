namespace Boardgame.Application.Common.Results.Authentication;

public record JwtDecodeResult(
    string Sub,
    string GivenName,
    string Jti,
    string Role,
    string Expires,
    string Issuer,
    string Audience);