using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public class UpdateQueueUserOkCommandHandler : IRequestHandler<UpdateQueueUserOkCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IQueueRepository _queueRepository;
    private readonly ITableRepository _tableRepository;
    private readonly INotificationRepository _notificationRepository;

    public UpdateQueueUserOkCommandHandler(IQueueRepository queueRepository, IUserRepository userRepository, ITableRepository tableRepository, INotificationRepository notificationRepository)
    {
        _queueRepository = queueRepository;
        _userRepository = userRepository;
        _tableRepository = tableRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateQueueUserOkCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.UserId, out Guid userIdGuid))
        {
            return Errors.User.UserNotFound;
        }

        if (!Guid.TryParse(request.TableId, out Guid tableGuid))
        {
            return Errors.Table.TableNotFound;
        }

        if (!Guid.TryParse(request.NotificationId, out Guid notificationGuid))
        {
            return Errors.Notification.NotificationNotFound;
        }

        if (await _notificationRepository.GetNotificationByIdAsync(notificationGuid) is not Notification notification)
        {
            return Errors.Notification.NotificationNotFound;
        }

        if (await _userRepository.GetUserByIdAsync(userIdGuid)! is not UserIdentity user)
        {
            return Errors.User.UserNotFound;
        }

        if (await _queueRepository.GetQueueInformationAsync(user.Id) is not Queue queue)
        {
            return Errors.Queue.QueueNotFound;
        }

        if (await _tableRepository.GetTableById(tableGuid) is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        notification.NotificationStatus = NotificationStatus.Offline;

        var resultNotification = await _notificationRepository.UpdateNotification(notification);

        if (resultNotification is false)
        {
            return Error.Failure(code: "Notification.FailToUpdate", description: "Can not update notification.");
        }

        queue.Status = QueueStatus.Waiting;
        queue.TableId = table.Id;

        var result = await _queueRepository.UpdateQueue(queue);

        if (result is false)
        {
            return Error.Failure(code: "Queue.FailToUpdate", description: "Can not update queue.");
        }

        return true;
    }
}
