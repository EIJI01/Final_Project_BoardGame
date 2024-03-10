using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record UpdateQueueComingSuccessCommand(
    string QueueId) : IRequest<ErrorOr<bool>>;