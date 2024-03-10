namespace Boardgame.Domain.Entities;

public class Work
{
    public Guid Id = Guid.NewGuid();
    public DateTime TimeIn { get; set; }
    public DateTime? TimeOut { get; set; } = null!;
    public bool Status { get; set; }

    // Reference
    public Guid UserId { get; set; }
    public UserIdentity? User { get; set; }
    public Guid BranchId { get; set; }
    public Branch? Branch { get; set; }
}