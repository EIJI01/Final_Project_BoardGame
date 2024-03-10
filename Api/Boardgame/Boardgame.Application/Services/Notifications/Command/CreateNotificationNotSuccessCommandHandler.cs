using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Common.Errors;
using ErrorOr;
using MediatR;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Entities.Common;
using Boardgame.Application.Common.interfaces.Email;

namespace Boardgame.Application.Services.Notifications.Command;

public class CreateNotificationNotSuccessCommandHandler : IRequestHandler<CreateNotificationNotSuccessCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly INotificationRepository _notificationRepository;
    private readonly IEmailProvider _emailProvider;

    public CreateNotificationNotSuccessCommandHandler(IUserRepository userRepository, IDateTimeProvider dateTimeProvider, INotificationRepository notificationRepository, IEmailProvider emailProvider)
    {
        _userRepository = userRepository;
        _dateTimeProvider = dateTimeProvider;
        _notificationRepository = notificationRepository;
        _emailProvider = emailProvider;
    }

    public async Task<ErrorOr<bool>> Handle(CreateNotificationNotSuccessCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.UserId, out Guid resultUser))
        {
            return Errors.User.UserNotFound;
        }

        if (await _userRepository.GetUserByIdAsync(resultUser)! is not UserIdentity user)
        {
            return Errors.User.UserNotFound;
        }

        var notification = new Notification
        {
            Id = Guid.NewGuid(),
            CreateAt = _dateTimeProvider.UtcNow.ToLocalTime(),
            UserId = user.Id,
            Type = TypeNotification.NotSuccess,
            NotificationStatus = NotificationStatus.Online
        };

        var result = await _notificationRepository.CreateNotification(notification);

        if (result is false)
        {
            return Error.Failure(code: "Notification.Failed", description: "Can not create notification.");
        }

        var recipients = new List<string> { user.Email };
        var subject = "BoardGame notify queue";
        var text = $"<h4>Sorry.</h4></br><div> Because there are currently a lot of queues and customers playing may take a longtime.</div>";

        if (await _emailProvider.SendEmailAsync(subject, text, recipients) is false)
        {
            return Errors.EmailSender.FailedToSendEmail;
        }

        return true;
    }
}
