namespace Boardgame.Domain.Entities;

public class Event
{
    public Guid Id = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;

}