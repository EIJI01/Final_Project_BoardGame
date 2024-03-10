using Boardgame.Api.Hubs.Repository;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Boardgame.Api.Hubs;

public class NotificationHub : Hub
{
    private readonly ILogger<NotificationHub> _logger;

    private readonly NotificationRepository _notificationRepository;
    private readonly NotificationHubRepository _notificationHubRepository;
    public NotificationHub(ILogger<NotificationHub> logger, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        _notificationRepository = new NotificationRepository(connectionString);
        _notificationHubRepository = new NotificationHubRepository(connectionString);
        _logger = logger;
    }

    public override Task OnConnectedAsync()
    {
        Clients.Caller.SendAsync("OnConnected");
        return base.OnConnectedAsync();
    }

    public async Task SendNotificationToClient(Notification notification)
    {
        var connectionHub = _notificationRepository.GetNotificationsFromUserId(notification.UserId);
        string jsonString = JsonConvert.SerializeObject(notification);
        foreach (var connection in connectionHub)
        {
            try
            {
                await Clients.Client(connection.ConnectionId).SendAsync("ReceivedPersonalNotification", jsonString);
            }
            catch (Exception ex)
            {
                _logger.LogWarning($"An error occurred while sending Message to Member: {ex.Message}");
            }
        }
    }
    public async Task SendQueueToUser(string tableQueueId, string nintendoQueueId)
    {
        try
        {
            await Clients.All.SendAsync("ReceivedQueueFromGM", tableQueueId, nintendoQueueId);
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending Notifications: {ex.Message}");
        }
    }
    public async Task SendNotifications()
    {
        try
        {
            var notifications = _notificationHubRepository.GetNotifications();
            string jsonString = JsonConvert.SerializeObject(notifications);
            await Clients.All.SendAsync("ReceivedNotifications", jsonString);
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending Notifications: {ex.Message}");
        }
    }
    public async Task SaveUserConnection(string userId)
    {
        var connectionId = Context.ConnectionId;
        await _notificationRepository.SaveUserConnection(userId, connectionId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await _notificationRepository.DeleteConnectionByConnectionIdAsync(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

}