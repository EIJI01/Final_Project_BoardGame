using Boardgame.Domain.Entities;
using TableDependency.SqlClient;

namespace Boardgame.Api.Hubs.SubscribeTableDependencies;

public class SubscribeCardTableDependency : ISubscribeTableDependencies
{
    SqlTableDependency<Card> tableDependency = null!;
    private readonly DatabaseTracking dashboard;

    public SubscribeCardTableDependency(DatabaseTracking dashboard)
    {
        this.dashboard = dashboard;
    }

    public void SubscribeTableDependency(string connectionString)
    {
        tableDependency = new SqlTableDependency<Card>(connectionString);
        tableDependency.OnChanged += TableDependency_OnChanged;
        tableDependency.OnError += TableDependency_OnError;
        tableDependency.Start();
    }

    private async void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<Card> e)
    {
        if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
        {
            await dashboard.SendCards();
        }
    }

    private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
    {
        Console.WriteLine($"{nameof(Card)} SqlTableDependency error: {e.Error.Message}");
    }
}