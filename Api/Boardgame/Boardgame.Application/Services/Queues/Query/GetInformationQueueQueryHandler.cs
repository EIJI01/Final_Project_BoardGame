using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Queues.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Query;

public class GetInformationQueueQueryHandler : IRequestHandler<GetInformationQueueQuery, ErrorOr<QueueResult>>
{
    private readonly IQueueRepository _queueRepository;
    private readonly IUserRepository _userRepository;

    public GetInformationQueueQueryHandler(IQueueRepository queueRepository, IUserRepository userRepository)
    {
        _queueRepository = queueRepository;
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<QueueResult>> Handle(GetInformationQueueQuery request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.UserId, out Guid resultGuid))
        {
            return Errors.User.UserNotFound;
        }

        if (await _userRepository.GetUserByIdAsync(resultGuid)! is not UserIdentity user)
        {
            return Errors.User.NotFoundEmail;
        }

        var queue = await _queueRepository.GetQueueInformationAsync(user.Id);

        if (queue is null)
        {
            return Errors.Queue.QueueNotFound;
        }

        return new QueueResult(
            queue);
    }
}
