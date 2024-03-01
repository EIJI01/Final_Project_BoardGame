namespace Boardgame.Domain.Entities;

public class RefreshToken
{
    public Guid Id = Guid.NewGuid();
    public string Token { get; set; } = string.Empty;
    public string JwtId { get; set; } = string.Empty;
    public bool IsUsed { get; set; }
    public bool IsRevoked { get; set; }
    public DateTime AddedDate { get; set; }
    public DateTime ExpiryDate { get; set; }

    // Reference
    public Guid UserId { get; set; }
    public UserIdentity User { get; set; } = null!;
}