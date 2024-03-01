using Boardgame.Application.Authentication.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public record RegisterCommand(
        string Name,
        string Email,
        string PhoneNumber,
        string Password,
        string ConfirmPassword) : IRequest<ErrorOr<AuthenticationResult>>;