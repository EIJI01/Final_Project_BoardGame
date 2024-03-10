using System.Data;
using System.Data.SqlClient;
using Boardgame.Domain.Entities;

namespace Boardgame.Api.Hubs.Repository;

public class NotificationRepository
{
    private readonly string connectionString;
    public NotificationRepository(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public List<ConnectionHub> GetNotificationsFromUserId(Guid userId)
    {
        var connectionHubs = new List<ConnectionHub>();
        ConnectionHub connectionHub;

        var data = GetConnectionHubsByUserIdAsync(userId);

        foreach (DataRow row in data.Rows)
        {
            connectionHub = new ConnectionHub
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                ConnectionId = row["ConnectionId"].ToString()!,
                UserId = Guid.Parse(row["UserId"].ToString()!),

            };
            connectionHubs.Add(connectionHub);
        }
        return connectionHubs;
    }
    private DataTable GetConnectionHubsByUserIdAsync(Guid userId)
    {
        var query = "SELECT * FROM ConnectionHub WHERE UserId = @UserId";
        var dataTable = new DataTable();
        using var connection = new SqlConnection(connectionString);
        try
        {
            connection.Open();
            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserId", userId);
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

    public async Task SaveUserConnection(string userId, string connectionId)
    {
        Guid newGuid = Guid.NewGuid();
        using var connection = new SqlConnection(connectionString);
        try
        {
            await connection.OpenAsync();
            var query = "INSERT INTO ConnectionHub (Id, ConnectionId, UserId) VALUES (@Id, @ConnectionId, @UserId)";
            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Id", newGuid);
            command.Parameters.AddWithValue("@ConnectionId", connectionId);
            command.Parameters.AddWithValue("@UserId", Guid.Parse(userId));
            await command.ExecuteNonQueryAsync();
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

    public async Task DeleteConnectionByConnectionIdAsync(string connectionId)
    {

        using var connection = new SqlConnection(connectionString);
        try
        {
            await connection.OpenAsync();
            var query = "DELETE FROM ConnectionHub WHERE ConnectionId = @ConnectionId";
            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@ConnectionId", connectionId);
            await command.ExecuteNonQueryAsync();
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
