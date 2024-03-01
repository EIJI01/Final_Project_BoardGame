namespace Boardgame.Infrastructure.Email;

public class SendGridSettings
{
    public const string SectionName = "SendGridEmailProvider";
    public string Host { get; init; } = null!;
    public string UserName { get; init; } = null!;
    public string Password { get; init; } = null!;
}