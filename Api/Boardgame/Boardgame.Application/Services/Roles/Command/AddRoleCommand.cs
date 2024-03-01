using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Roles.Command;

public record AddRoleCommand(
    string Role) : IRequest<ErrorOr<bool>>;