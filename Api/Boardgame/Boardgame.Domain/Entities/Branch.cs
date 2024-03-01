namespace Boardgame.Domain.Entities;

public class Branch
{
    public Guid Id = Guid.NewGuid();
    public string Address { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public decimal PlayPricePerHour { get; set; }
    public decimal BuffetPrice { get; set; }

    // Reference
    public ICollection<TablePlay>? Tables { get; set; }
    public ICollection<Work>? Works { get; set; }
    public ICollection<Card>? Cards { get; set; }
    public ICollection<Queue>? Queues { get; set; }
}