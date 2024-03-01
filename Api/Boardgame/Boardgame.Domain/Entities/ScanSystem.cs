namespace Boardgame.Domain.Entities;

public class ScanSystem
{
    public Guid Id = Guid.NewGuid();
    public bool Status { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime StopTime { get; set; }
    public decimal TotalPrice { get; set; }

    /// Reference
    public Guid TableId { get; set; }
    public TablePlay? Table { get; set; }
    public Guid CardId { get; set; }
    public Card? Card { get; set; }
}