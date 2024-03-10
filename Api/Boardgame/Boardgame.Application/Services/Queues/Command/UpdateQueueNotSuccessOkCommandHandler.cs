using Boardgame.Application.Common.interfaces.Persistence;
using ErrorOr;
using MediatR;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities.Common;
using Boardgame.Domain.Entities;

namespace Boardgame.Application.Services.Queues.Command;

public class UpdateQueueNotSuccessOkCommandHandler : IRequestHandler<UpdateQueueNotSuccessOkCommand, ErrorOr<bool>>
{
    private readonly INotificationRepository _notificationRepository;
    private readonly IQueueRepository _queueRepository;

    public UpdateQueueNotSuccessOkCommandHandler(INotificationRepository notificationRepository, IQueueRepository queueRepository)
    {
        _notificationRepository = notificationRepository;
        _queueRepository = queueRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateQueueNotSuccessOkCommand request, CancellationToken cancellationToken)
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

        return true;
    }
}
