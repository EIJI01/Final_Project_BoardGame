using Boardgame.Application.Authentication.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Login;

public record LoginCommand(
    string Email,
    string Password) : IRequest<ErrorOr<AuthenticationResult>>;