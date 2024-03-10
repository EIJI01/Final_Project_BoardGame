using System.Data;
using System.Data.SqlClient;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;

namespace Boardgame.Api.Hubs.Repository;

public class QueueRepositoryHub
{
    private readonly string connectionString;
    public QueueRepositoryHub(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public List<Queue> GetQueues()
    {
        var queues = new List<Queue>();
        Queue queue;

        var data = GetQueueDetailFromDb();
        foreach (DataRow row in data.Rows)
        {
            queue = new Queue
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                Status = (QueueStatus)Enum.ToObject(typeof(QueueStatus), row["Status"]),
                QueueNumber = row["QueueNumber"].ToString()!,
                CreateAt = Convert.ToDateTime(row["CreateAt"]),
                TableType = (TableType)Enum.ToObject(typeof(TableType), row["TableType"]),
                TableId = row["TableId"] != DBNull.Value ? Guid.Parse(row["TableId"].ToString()!) : Guid.Empty,
                NumberOfPeople = Convert.ToInt32(row["NumberOfPeople"]),
                UserId = Guid.Parse(row["UserId"].ToString()!),
                BranchId = Guid.Parse(row["BranchId"].ToString()!),
            };
            queues.Add(queue);
        }
        return queues;
    }

    private DataTable GetQueueDetailFromDb()
    {
        var query = "SELECT Id, Status, QueueNumber, CreateAt, TableType, TableId, NumberOfPeople, UserId, BranchId FROM Queue";
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