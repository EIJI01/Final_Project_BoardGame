namespace Boardgame.Api.Hubs.Models;

public class ScanSystemJoinCards
{
    public Guid Id = Guid.NewGuid();
    public bool Status { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? StopTime { get; set; } = null!;
    public decimal TotalPrice { get; set; }
    public Guid TableId { get; set; }
    public string CardNumber { get; set; } = string.Empty;
    public Guid BranchId { get; set; }

}