using Boardgame.Domain.Entities.Common;

namespace Boardgame.Domain.Entities;

public class Notification
{
    public Guid Id { get; set; }
    public DateTime CreateAt { get; set; }
    public TypeNotification Type { get; set; } = TypeNotification.Success;
    public string TableId { get; set; } = string.Empty;
    public NotificationStatus NotificationStatus { get; set; } = NotificationStatus.Online;
    public Guid UserId { get; set; }
    public UserIdentity? User { get; set; }
}