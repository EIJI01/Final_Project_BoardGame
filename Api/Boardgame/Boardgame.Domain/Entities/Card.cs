namespace Boardgame.Domain.Entities;

public class Card
{
    public Guid Id = Guid.NewGuid();
    public string CardNumber { get; set; } = string.Empty;
    public Guid BranchId { get; set; }
    public Branch? Branch { get; set; }
    public ICollection<ScanSystem>? ScanSystems { get; set; }
}