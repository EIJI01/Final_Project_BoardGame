namespace Boardgame.Contracts.Services.Queues.Requests;

public record UpdateQueueUserOkRequest(
    string TableId,
    string NotificationId,
    string? UserId);
