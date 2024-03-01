using System.Data;
using System.Data.SqlClient;
using Boardgame.Domain.Entities;

namespace Boardgame.Api.Hubs.Repository;

public class CardRepositoryHub
{
    private readonly string connectionString;
    public CardRepositoryHub(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public List<Card> GetCards()
    {

        var cards = new List<Card>();
        Card card;
        var data = GetCardDetailsFromDb();
        foreach (DataRow row in data.Rows)
        {
            card = new Card
            {
                Id = Guid.Parse(row["Id"].ToString()!),
                CardNumber = row["CardNumber"].ToString()!,
                BranchId = Guid.Parse(row["BranchId"].ToString()!),
            };
            cards.Add(card);
        }
        return cards;
    }
    private DataTable GetCardDetailsFromDb()
    {
        var query = "SELECT Id, CardNumber, BranchId FROM Card";
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