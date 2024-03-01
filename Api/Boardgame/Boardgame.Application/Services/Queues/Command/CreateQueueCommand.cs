using Boardgame.Application.Services.Queues.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public record CreateQueueCommand(
    string Email,
    int TableType,
    int NumberOfPeople,
    string BranchId) : IRequest<ErrorOr<QueueResult>>;