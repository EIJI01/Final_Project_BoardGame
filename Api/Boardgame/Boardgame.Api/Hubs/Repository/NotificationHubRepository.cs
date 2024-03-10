using System.Data;
using System.Data.SqlClient;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;

namespace Boardgame.Api.Hubs.Repository;

public class NotificationHubRepository
{
    private readonly string connectionString;
    public NotificationHubRepository(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public List<Notification> GetNotifications()
    {
        var notifications = new List<Notification>();
        Notification notification;

        var data = GetNotificationDetails();

        foreach (DataRow row in data.Rows)
        {
            notification = new Notification
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                CreateAt = Convert.ToDateTime(row["CreateAt"]),
                Type = (TypeNotification)Enum.ToObject(typeof(TypeNotification), row["Type"]),
                TableId = row["TableId"].ToString()!,
                NotificationStatus = (NotificationStatus)Enum.ToObject(typeof(NotificationStatus), row["NotificationStatus"]),
                UserId = Guid.Parse(row["UserId"].ToString()!),

            };
            notifications.Add(notification);
        }
        return notifications;
    }
    private DataTable GetNotificationDetails()
    {
        var query = "SELECT * FROM Notification";
        var dataTable = new DataTable();

        using var connection = new SqlConnection(connectionString);
        try
        {
            connection.Open();
            using var command = new SqlCommand(query, connection);
            using SqlDataReader reader = command.ExecuteReader();
            dataTable.Load(reader);
            return dataTable;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
        finally
        {
            connection.Close();
        }
    }
}