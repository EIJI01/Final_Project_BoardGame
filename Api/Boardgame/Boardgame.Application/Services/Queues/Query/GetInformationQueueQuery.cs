using Boardgame.Application.Services.Queues.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Query;

public record GetInformationQueueQuery(
    string UserId) : IRequest<ErrorOr<QueueResult>>;