using Boardgame.Application.Authentication.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.RefreshTokens;

public record RefreshTokenCommand(
    string AccessToken,
    string RefreshToken) : IRequest<ErrorOr<AuthenticationWithRefreshTokenResult>>;