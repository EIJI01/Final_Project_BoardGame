using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record UpdateQueueCancelQueueCommand(
    string UserId) : IRequest<ErrorOr<bool>>;