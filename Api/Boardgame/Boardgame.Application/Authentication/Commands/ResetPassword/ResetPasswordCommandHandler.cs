using System.Text;
using Boardgame.Application.Common.interfaces.Authentication.Persistence;
using Boardgame.Application.Common.interfaces.Email;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.WebUtilities;

namespace Boardgame.Application.Authentication.Commands.ResetPassword;

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IAuthentication _authentication;
    private readonly IEmailProvider _emailProvider;

    public ResetPasswordCommandHandler(IUserRepository userRepository, IAuthentication authentication, IEmailProvider emailProvider)
    {
        _userRepository = userRepository;
        _authentication = authentication;
        _emailProvider = emailProvider;
    }

    public async Task<ErrorOr<bool>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepository.GetUserByEmailAsync(request.Email)! is not UserIdentity user)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        if (!request.Password.Equals(request.ConfirmPassword))
        {
            return Error.Conflict(code: "InvalidPassword.", description: "Password not equals.");
        }

        var tokenRequest = WebEncoders.Base64UrlDecode(request.Token);
        var token = Encoding.UTF8.GetString(tokenRequest);

        var result = await _authentication.ConfirmResetPasswordAsync(user, token, request.Password);

        if (!result.Succeeded)
        {
            return Error.Failure(code: "ResetPasswordFail.", description: "Can not to reset password.");
        }

        var recipients = new List<string> { user.Email };
        var subject = "Reset Password Success";
        var text = $"<h5>You have successfully reset your password.</h5>";

        if (await _emailProvider.SendEmailAsync(subject, text, recipients) is false)
        {
            return Errors.EmailSender.FailedToSendEmail;
        }

        return true;

    }
}
