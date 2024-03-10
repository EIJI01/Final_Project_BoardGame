namespace Boardgame.Contracts.Services.Notifications.Requests;

public record CreateNotificationRequest(
    string UserId,
    string TableId);