using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class NotificationRepository : INotificationRepository
{
    private readonly DataContext _dataContext;

    public NotificationRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> CreateNotification(Notification notification)
    {
        await _dataContext.Notifications!.AddAsync(notification);
        return await Save();
    }

    public async Task<Notification?> GetNotificationByIdAsync(Guid notificationId)
    {
        return await _dataContext.Notifications!.FirstOrDefaultAsync(n => n.Id == notificationId);
    }

    public async Task<Notification?> GetNotificationByUserId(Guid userId)
    {
        return await _dataContext.Notifications!.FirstOrDefaultAsync(n => n.UserId == userId && n.NotificationStatus == NotificationStatus.Online);
    }

    public async Task<bool> IsNotificationAlreadySend(Guid userId)
    {
        var result = await _dataContext.Notifications!.FirstOrDefaultAsync(n => n.UserId == userId && n.NotificationStatus == NotificationStatus.Online);
        if (result is not null)
        {
            return true;
        }
        return false;
    }

    public async Task<bool> UpdateNotification(Notification notification)
    {
        _dataContext.Notifications!.Update(notification);
        return await Save();
    }

    private async Task<bool> Save()
    {
        var result = await _dataContext.SaveChangesAsync();
        return result > 0;
    }
}
