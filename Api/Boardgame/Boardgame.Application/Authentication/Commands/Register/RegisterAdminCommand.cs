using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public record RegisterAdminCommand(
    string Name,
    string Username,
    string Password) : IRequest<ErrorOr<bool>>;