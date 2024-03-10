using System.Data;
using System.Data.SqlClient;
using Boardgame.Api.Hubs.Models;
using Boardgame.Domain.Entities;

namespace Boardgame.Api.Hubs.Repository;

public class ScanSystemRepositoryHub
{
    private readonly string connectionString;
    public ScanSystemRepositoryHub(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public List<ScanSystem> GetScanSystems()
    {
        var scanSystems = new List<ScanSystem>();
        ScanSystem scanSystem;

        var data = GetScanSystemDetailFromDb();
        foreach (DataRow row in data.Rows)
        {
            scanSystem = new ScanSystem
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                Status = Convert.ToBoolean(row["Status"]),
                StartTime = Convert.ToDateTime(row["StartTime"]),
                StopTime = row["StopTime"] != DBNull.Value ? Convert.ToDateTime(row["StopTime"]) : (DateTime?)null,
                TotalPrice = Convert.ToDecimal(row["TotalPrice"]),
                TableId = Guid.Parse(row["TableId"].ToString()!),
                CardId = Guid.Parse(row["CardId"].ToString()!)
            };
            scanSystems.Add(scanSystem);
        }
        return scanSystems;
    }

    public List<ScanSystemJoinCards> GetScanSystemsJoinCards()
    {
        var scanSystemsJoinCards = new List<ScanSystemJoinCards>();
        ScanSystemJoinCards scanSystemJoinCard;

        var data = GetScanSystemJoinCardsDetailFromDb();
        foreach (DataRow row in data.Rows)
        {
            scanSystemJoinCard = new ScanSystemJoinCards
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                Status = Convert.ToBoolean(row["Status"]),
                StartTime = Convert.ToDateTime(row["StartTime"]),
                StopTime = row["StopTime"] != DBNull.Value ? Convert.ToDateTime(row["StopTime"]) : (DateTime?)null,
                TotalPrice = Convert.ToDecimal(row["TotalPrice"]),
                TableId = Guid.Parse(row["TableId"].ToString()!),
                BranchId = Guid.Parse(row["BranchId"].ToString()!),
                CardNumber = row["CardNumber"].ToString()!
            };
            scanSystemsJoinCards.Add(scanSystemJoinCard);
        }
        return scanSystemsJoinCards;
    }

    private DataTable GetScanSystemDetailFromDb()
    {
        var query = "SELECT Id, Status, StartTime, StopTime, TotalPrice, TableId, CardId FROM ScanSystem";
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

    private DataTable GetScanSystemJoinCardsDetailFromDb()
    {
        var query = "SELECT ScanSystem.Id, ScanSystem.Status, ScanSystem.StartTime, ScanSystem.StopTime, ScanSystem.TotalPrice, ScanSystem.TableId, Card.BranchId, Card.CardNumber FROM ScanSystem INNER JOIN Card ON ScanSystem.CardId=Card.Id";
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