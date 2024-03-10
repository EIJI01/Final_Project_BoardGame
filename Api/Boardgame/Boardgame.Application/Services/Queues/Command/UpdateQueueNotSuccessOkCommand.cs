using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record UpdateQueueNotSuccessOkCommand(
    string UserId) : IRequest<ErrorOr<bool>>;