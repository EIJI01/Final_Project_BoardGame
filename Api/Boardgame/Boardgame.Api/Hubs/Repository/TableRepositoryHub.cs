using System.Data;
using System.Data.SqlClient;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;

namespace Boardgame.Api.Hubs.Repository;

public class TableRepositoryHub
{
    private readonly string connectionString;
    public TableRepositoryHub(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public List<TablePlay> GetTables()
    {

        var tables = new List<TablePlay>();
        TablePlay table;
        var data = GetCardDetailsFromDb();
        foreach (DataRow row in data.Rows)
        {
            table = new TablePlay
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                TableNumber = row["TableNumber"].ToString()!,
                Type = (TableType)Enum.ToObject(typeof(TableType), row["Type"]),
                Status = (StatusTable)Enum.ToObject(typeof(StatusTable), row["Status"]),
                BranchId = Guid.Parse(row["BranchId"].ToString()!)
            };
            tables.Add(table);
        }
        return tables;
    }
    private DataTable GetCardDetailsFromDb()
    {
        var query = "SELECT Id, TableNumber, Type, Status, BranchId FROM TablePlay";
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