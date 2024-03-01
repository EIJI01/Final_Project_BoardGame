using Microsoft.AspNetCore.Identity;

namespace Boardgame.Domain.Entities;

public class UserIdentity : IdentityUser<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public decimal Salary { get; set; }

    // Reference
    public RefreshToken? Refresh { get; set; }
    public ICollection<Work>? Works { get; set; }
    public Queue? Queue { get; set; }
}