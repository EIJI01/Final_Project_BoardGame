namespace Boardgame.Application.Common.interfaces.Email;

public interface IEmailProvider
{
    Task<bool> SendEmailAsync(string subject, string message, List<string> recipients);
}