using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.ResetPassword;

public record ResetPasswordCommand(
    string Email,
    string Token,
    string Password,
    string ConfirmPassword) : IRequest<ErrorOr<bool>>;