using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using TableDependency.SqlClient;

namespace Boardgame.Api.Hubs.SubscribeTableDependencies;

public class SubscribeNotificationDependency : ISubscribeNotificationDependencies
{
    SqlTableDependency<Notification> tableDependency = null!;
    private readonly NotificationHub notificationHub;
    public SubscribeNotificationDependency(NotificationHub notificationHub)
    {
        this.notificationHub = notificationHub;

    }
    public void SubscribeTableDependency(string connectionString)
    {
        tableDependency = new SqlTableDependency<Notification>(connectionString);
        tableDependency.OnChanged += TableDependency_OnChanged; ;
        tableDependency.OnError += TableDependency_OnError;
        tableDependency.Start();
    }

    private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
    {
        Console.WriteLine($"{nameof(Notification)} SqlTableDependency error: {e.Error.Message}");
    }

    private async void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<Notification> e)
    {
        if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
        {
            var notification = e.Entity;
            await notificationHub.SendNotifications();
            if (notification.NotificationStatus != NotificationStatus.Offline)
            {
                await notificationHub.SendNotificationToClient(notification);
            }
        }
    }
}
