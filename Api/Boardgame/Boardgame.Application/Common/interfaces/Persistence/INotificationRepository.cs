using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface INotificationRepository
{
    Task<bool> CreateNotification(Notification notification);
    Task<bool> IsNotificationAlreadySend(Guid userId);
    Task<Notification?> GetNotificationByIdAsync(Guid notificationId);
    Task<bool> UpdateNotification(Notification notification);
    Task<Notification?> GetNotificationByUserId(Guid userId);
}