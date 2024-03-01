using Boardgame.Domain.Entities.Common;

namespace Boardgame.Domain.Entities;

public class Queue
{
    public Guid Id = Guid.NewGuid();
    public string QueueNumber { get; set; } = string.Empty;
    public DateTime CreateAt { get; set; }
    public TableType TableType { get; set; } = TableType.Table;
    public int NumberOfPeople { get; set; }
    public bool Status { get; set; }

    // Reference
    public Guid UserId { get; set; }
    public UserIdentity? User { get; set; }
    public Guid BranchId { get; set; }
    public Branch? Branch { get; set; }
    public Guid TableId { get; set; }
    public TablePlay? Table { get; set; }
}