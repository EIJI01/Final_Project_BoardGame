namespace Boardgame.Domain.Entities;

public class ConnectionHub
{
    public Guid Id = Guid.NewGuid();
    public string ConnectionId { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public UserIdentity? User { get; set; }
}