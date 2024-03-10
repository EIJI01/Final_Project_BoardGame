using Boardgame.Application.Common.interfaces.Email;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Notifications.Command;

public class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly ITableRepository _tableRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly INotificationRepository _notificationRepository;
    private readonly IEmailProvider _emailProvider;

    public CreateNotificationCommandHandler(IUserRepository userRepository, ITableRepository tableRepository, IDateTimeProvider dateTimeProvider, INotificationRepository notificationRepository, IEmailProvider emailProvider)
    {
        _userRepository = userRepository;
        _tableRepository = tableRepository;
        _dateTimeProvider = dateTimeProvider;
        _notificationRepository = notificationRepository;
        _emailProvider = emailProvider;
    }

    public async Task<ErrorOr<bool>> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.UserId, out Guid resultUser))
        {
            return Errors.User.UserNotFound;
        }
        if (!Guid.TryParse(request.TableId, out Guid resultTable))
        {
            return Errors.Table.TableNotFound;
        }

        if (await _userRepository.GetUserByIdAsync(resultUser)! is not UserIdentity user)
        {
            return Errors.User.UserNotFound;
        }
        if (await _tableRepository.GetTableById(resultTable)! is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        var notification = new Notification
        {
            Id = Guid.NewGuid(),
            TableId = table.Id.ToString(),
            CreateAt = _dateTimeProvider.UtcNow.ToLocalTime(),
            UserId = user.Id,
            Type = TypeNotification.Success,
            NotificationStatus = NotificationStatus.Online
        };

        var result = await _notificationRepository.CreateNotification(notification);

        if (result is false)
        {
            return Error.Failure(code: "Notification.Failed", description: "Can not create notification.");
        }

        var recipients = new List<string> { user.Email };
        var subject = "BoardGame notify queue";
        var text = $"<h4>It's your turn.</h4></br><div>You table is {table.TableNumber}</div>";

        if (await _emailProvider.SendEmailAsync(subject, text, recipients) is false)
        {
            return Errors.EmailSender.FailedToSendEmail;
        }

        return true;
    }
}
