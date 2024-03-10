using Boardgame.Domain.Entities;
using TableDependency.SqlClient;

namespace Boardgame.Api.Hubs.SubscribeTableDependencies;

public class SubscribeQueueDependency : ISubscribeTableDependencies
{
    SqlTableDependency<Queue> tableDependency = null!;
    private readonly DatabaseTracking databaseTracking;

    public SubscribeQueueDependency(DatabaseTracking databaseTracking)
    {
        this.databaseTracking = databaseTracking;
    }

    public void SubscribeTableDependency(string connectionString)
    {
        tableDependency = new SqlTableDependency<Queue>(connectionString);
        tableDependency.OnChanged += TableDependency_OnChanged;
        tableDependency.OnError += TableDependency_OnError;
        tableDependency.Start();
    }

    private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
    {
        Console.WriteLine($"{nameof(Queue)} SqlTableDependency error: {e.Error.Message}");
    }

    private async void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<Queue> e)
    {
        if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
        {
            await databaseTracking.SendQueues();
        }
    }
}
