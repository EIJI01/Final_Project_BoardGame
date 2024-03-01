using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public record RegisterGmCommand(
    string Name,
    string Email,
    string PhoneNumber,
    string Password,
    string ConfirmPassword) : IRequest<ErrorOr<bool>>;