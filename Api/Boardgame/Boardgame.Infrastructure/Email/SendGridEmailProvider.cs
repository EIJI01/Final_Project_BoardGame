using Boardgame.Application.Common.interfaces.Email;
using Microsoft.Extensions.Options;

namespace Boardgame.Infrastructure.Email;

public class SendGridEmailProvider : IEmailProvider
{
    private readonly SendGridSettings _sendGridSettings;

    public SendGridEmailProvider(IOptions<SendGridSettings> sendGridSettings)
    {
        _sendGridSettings = sendGridSettings.Value;
    }

    public async Task<bool> SendEmailAsync(string subject, string message, List<string> recipients)
    {
        string sendingResults = string.Empty;

        await Task.Run(() =>
        {
            sendingResults = $"Email Provider: !! SENDGRID - SMTP !! {Environment.NewLine}" +
            $"Host: {_sendGridSettings.Host} {Environment.NewLine}" +
            $"UserName: {_sendGridSettings.UserName} {Environment.NewLine}" +
            $"Password: {_sendGridSettings.Password} {Environment.NewLine}" +
            $"Subject: {subject} {Environment.NewLine}" +
            $"Message: {message} {Environment.NewLine}" +
            $"Recipients Provider: {String.Join(",", recipients)}";
        });

        return true;
    }
}
