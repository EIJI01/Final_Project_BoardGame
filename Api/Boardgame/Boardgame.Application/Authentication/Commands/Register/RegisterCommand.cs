using Boardgame.Application.Authentication.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public record RegisterCommand(
        string FirstName,
        string LastName,
        string Email,
        string Password) : IRequest<ErrorOr<AuthenticationResult>>;