using System.Diagnostics;
using System.Text;
using Boardgame.Application.Common.interfaces.Authentication.Persistence;
using Boardgame.Application.Common.interfaces.Email;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.WebUtilities;

namespace Boardgame.Application.Authentication.Queries.ForgetPassword;

public class ForgetPasswordSendEmailQueryHandler : IRequestHandler<ForgetPasswordSendEmailQuery, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IEmailProvider _emailProvider;
    private readonly IAuthentication _authentication;

    public ForgetPasswordSendEmailQueryHandler(IUserRepository userRepository, IEmailProvider emailProvider, IAuthentication authentication)
    {
        _userRepository = userRepository;
        _emailProvider = emailProvider;
        _authentication = authentication;
    }

    public async Task<ErrorOr<bool>> Handle(ForgetPasswordSendEmailQuery request, CancellationToken cancellationToken)
    {
        if (await _userRepository.GetUserByEmailAsync(request.Email)! is not UserIdentity user)
        {
            return Errors.User.NotFoundEmail;
        }

        // Generate token reset password.
        var token = await _authentication.GenerateResetPasswordTokenAsync(user);
        var tokenByte = Encoding.UTF8.GetBytes(token);
        var tokenEncode = WebEncoders.Base64UrlEncode(tokenByte);

        // Send email to reset password.
        var recipients = new List<string> { user.Email };
        var subject = "Reset Password";
        var url = $"http://localhost:3000/reset-password?email={user.Email}&token={tokenEncode}";
        var text = $"<h5>Please click link for reset your password.</h5>" +
                   $"<a href={url} target='_blank'>Reset password</a>";

        if (await _emailProvider.SendEmailAsync(subject, text, recipients) is false)
        {
            return Errors.EmailSender.FailedToSendEmail;
        }

        Console.WriteLine("token = {0}", tokenEncode);

        return true;
    }
}
