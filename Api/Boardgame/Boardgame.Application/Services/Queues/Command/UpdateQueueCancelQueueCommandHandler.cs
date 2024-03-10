using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public class UpdateQueueCancelQueueCommandHandler : IRequestHandler<UpdateQueueCancelQueueCommand, ErrorOr<bool>>
{
    private readonly IQueueRepository _queueRepository;
    private readonly INotificationRepository _notificationRepository;

    public UpdateQueueCancelQueueCommandHandler(IQueueRepository queueRepository, INotificationRepository notificationRepository)
    {
        _queueRepository = queueRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateQueueCancelQueueCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.UserId, out Guid userGuid))
        {
            return Errors.User.NotFoundEmail;
        }

        if (await _queueRepository.GetQueueInformationAsync(userGuid) is not Queue queue)
        {
            return Errors.Queue.QueueNotFound;
        }

        if (queue.Status is QueueStatus.Offline)
        {
            return Errors.Queue.QueueNotFound;
        }

        if (await _notificationRepository.GetNotificationByUserId(queue.UserId) is Notification notification)
        {
            notification.NotificationStatus = NotificationStatus.Offline;
            var resultNotification = await _notificationRepository.UpdateNotification(notification);

            if (resultNotification is false)
            {
                return Error.Failure(code: "Notification.FailToUpdate", description: "Can not update notification.");
            }
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
