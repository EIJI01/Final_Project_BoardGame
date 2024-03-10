using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record UpdateQueueUserOkCommand(
    string NotificationId,
    string UserId,
    string TableId) : IRequest<ErrorOr<bool>>;