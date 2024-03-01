using Boardgame.Domain.Entities.Common;

namespace Boardgame.Domain.Entities;

public class TablePlay
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string TableNumber { get; set; } = string.Empty;
    public TableType Type { get; set; } = TableType.Table;
    public StatusTable Status { get; set; } = StatusTable.Empty;

    // Reference
    public Guid BranchId { get; set; }
    public Branch? Branch { get; set; }
    public ICollection<ScanSystem>? ScanSystems { get; set; }
    public Queue? Queue { get; set; }
}