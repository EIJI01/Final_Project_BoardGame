using Boardgame.Domain.Entities;
using TableDependency.SqlClient;

namespace Boardgame.Api.Hubs.SubscribeTableDependencies;

public class SubscribeTablesDependency : ISubscribeTableDependencies
{
    SqlTableDependency<TablePlay> tableDependency = null!;
    private readonly DatabaseTracking databaseTracking;

    public SubscribeTablesDependency(DatabaseTracking databaseTracking)
    {
        this.databaseTracking = databaseTracking;
    }

    public void SubscribeTableDependency(string connectionString)
    {
        tableDependency = new SqlTableDependency<TablePlay>(connectionString);
        tableDependency.OnChanged += TableDependency_OnChanged;
        tableDependency.OnError += TableDependency_OnError;
        tableDependency.Start();
    }

    private async void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<TablePlay> e)
    {
        if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
        {
            await databaseTracking.SendTables();
        }
    }
    private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
    {
        Console.WriteLine($"{nameof(TablePlay)} SqlTableDependency error: {e.Error.Message}");
    }

}
