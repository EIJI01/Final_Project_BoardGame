using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record UpdateQueueUserCancelCommand(
    string QueueId) : IRequest<ErrorOr<bool>>;