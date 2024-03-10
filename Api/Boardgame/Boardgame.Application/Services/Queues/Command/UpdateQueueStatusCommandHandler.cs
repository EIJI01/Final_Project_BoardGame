using Boardgame.Application.Common.interfaces.Email;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public class UpdateQueueStatusCommandHandler : IRequestHandler<UpdateQueueStatusCommand, ErrorOr<bool>>
{
    private readonly IQueueRepository _queueRepository;
    private readonly IUserRepository _userRepository;
    private readonly IEmailProvider _emailProvider;
    private readonly INotificationRepository _notificationRepository;

    public UpdateQueueStatusCommandHandler(IQueueRepository queueRepository, IUserRepository userRepository, IEmailProvider emailProvider, INotificationRepository notificationRepository)
    {
        _queueRepository = queueRepository;
        _userRepository = userRepository;
        _emailProvider = emailProvider;
        _notificationRepository = notificationRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateQueueStatusCommand request, CancellationToken cancellationToken)
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

        if (await _userRepository.GetUserByIdAsync(queue.UserId)! is not UserIdentity user)
        {
            return Errors.User.UserNotFound;
        }

        var recipients = new List<string> { user.Email };
        var subject = "BoardGame notify queue";
        var text = $"<h4>Sorry.</h4></br><div> The allotted time has expired.</div></br><div>You have given up your right to join the queue.</div>";

        if (await _emailProvider.SendEmailAsync(subject, text, recipients) is false)
        {
            return Errors.EmailSender.FailedToSendEmail;
        }

        return true;
    }
}
