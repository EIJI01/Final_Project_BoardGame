using System.Net.Http.Headers;
using System.Text;
using Boardgame.Application.Common.interfaces.Email;
using Boardgame.Infrastructure.Email.Configs.MailConfigKeys;
using Microsoft.Extensions.Options;

namespace Boardgame.Infrastructure.Email;

public class MailGunEmailProvider : IEmailProvider
{
    private readonly MailGunSettings _mailGunSettings;

    public MailGunEmailProvider(IOptions<MailGunSettings> mailGunSettings)
    {
        _mailGunSettings = mailGunSettings.Value;
    }

    public async Task<bool> SendEmailAsync(string subject, string message, List<string> recipients)
    {

        var checkResult = new bool();

        using (var httpClient = new HttpClient())
        {
            var authToken = Encoding.ASCII.GetBytes($"{MailKeys.Api}:{_mailGunSettings.APIKey}");

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                MailKeys.Basic, Convert.ToBase64String(authToken));

            var content = new Dictionary<string, string>
            {
                {MailKeys.From, $"{_mailGunSettings.DisplayName} {_mailGunSettings.From}"},
                {MailKeys.To, $"{string.Join(",",recipients)}"},
                {MailKeys.Subject, $"{subject}"},
                {MailKeys.Html, $"{message}"},
            };

            var fromContent = new FormUrlEncodedContent(content);

            var result = await httpClient.PostAsync(
                $"{_mailGunSettings.APIUrl}/{_mailGunSettings.Domain}/messages",
                fromContent);

            Console.WriteLine(result.EnsureSuccessStatusCode());

            checkResult = result.IsSuccessStatusCode; ;
        }

        return checkResult;
    }
}
