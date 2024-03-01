using Boardgame.Domain.Entities;
using TableDependency.SqlClient;

namespace Boardgame.Api.Hubs.SubscribeTableDependencies;

public class SubscribeScanSystemTableDependency : ISubscribeTableDependencies
{
    SqlTableDependency<ScanSystem> tableDependency = null!;
    private readonly DatabaseTracking dashboard;

    public SubscribeScanSystemTableDependency(DatabaseTracking dashboard)
    {
        this.dashboard = dashboard;
    }

    public void SubscribeTableDependency(string connectionString)
    {
        tableDependency = new SqlTableDependency<ScanSystem>(connectionString);
        tableDependency.OnChanged += TableDependency_OnChanged;
        tableDependency.OnError += TableDependency_OnError;
        tableDependency.Start();
    }

    private async void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<ScanSystem> e)
    {
        if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
        {
            await dashboard.SendScanSystems();
        }
    }

    private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
    {
        Console.WriteLine($"{nameof(ScanSystem)} SqlTableDependency error: {e.Error.Message}");
    }
}