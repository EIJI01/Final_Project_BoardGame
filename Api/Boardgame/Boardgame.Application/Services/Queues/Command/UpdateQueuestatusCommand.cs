using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record UpdateQueueStatusCommand(
    string QueueId) : IRequest<ErrorOr<bool>>;