namespace Boardgame.Infrastructure.Email;

public class MailGunSettings
{
    public const string SectionName = "MailGunEmailProvider";
    public string APIUrl { get; init; } = null!;
    public string Domain { get; init; } = null!;
    public string APIKey { get; init; } = null!;
    public string From { get; init; } = null!;
    public string DisplayName { get; init; } = null!;
}