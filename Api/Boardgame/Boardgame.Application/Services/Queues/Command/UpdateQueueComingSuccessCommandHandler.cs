using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public class UpdateQueueComingSuccessCommandHandler : IRequestHandler<UpdateQueueComingSuccessCommand, ErrorOr<bool>>
{
    private readonly IQueueRepository _queueRepository;

    public UpdateQueueComingSuccessCommandHandler(IQueueRepository queueRepository)
    {
        _queueRepository = queueRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateQueueComingSuccessCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.QueueId, out Guid queueGuid))
        {
            return Errors.Queue.QueueNotFound;
        }

        if (await _queueRepository.GetQueueById(queueGuid) is not Queue queue)
        {
            return Errors.Queue.QueueNotFound;
        }

        queue.Status = QueueStatus.Offline;

        var result = await _queueRepository.UpdateQueue(queue);

        if (result is false)
        {
            return Error.Failure(code: "Queue.FailToUpdate", description: "Can not update queue.");
        }

        return true;
    }
}
