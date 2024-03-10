using Boardgame.Application.Common.interfaces.Persistence;
using ErrorOr;
using MediatR;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;

namespace Boardgame.Application.Services.Queues.Command;

public class UpdateQueueUserCancelCommandHandler : IRequestHandler<UpdateQueueUserCancelCommand, ErrorOr<bool>>
{
    private readonly IQueueRepository _queueRepository;
    private readonly IUserRepository _userRepository;
    private readonly INotificationRepository _notificationRepository;

    public UpdateQueueUserCancelCommandHandler(IQueueRepository queueRepository, IUserRepository userRepository, INotificationRepository notificationRepository)
    {
        _queueRepository = queueRepository;
        _userRepository = userRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateQueueUserCancelCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.QueueId, out Guid guidResult))
        {
            return Errors.Queue.QueueNotFound;
        }

        if (await _queueRepository.GetQueueById(guidResult) is not Queue queue)
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
