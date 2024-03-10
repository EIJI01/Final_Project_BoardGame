using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Notifications.Command;

public record CreateNotificationCommand(
    string UserId,
    string TableId) : IRequest<ErrorOr<bool>>;