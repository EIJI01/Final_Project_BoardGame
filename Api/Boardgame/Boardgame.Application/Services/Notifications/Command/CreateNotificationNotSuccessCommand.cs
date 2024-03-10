using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Notifications.Command;

public record CreateNotificationNotSuccessCommand(
    string UserId) : IRequest<ErrorOr<bool>>;