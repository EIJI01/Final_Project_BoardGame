using Boardgame.Application.Authentication.Commands.Login;
using Boardgame.Application.Authentication.Commands.RefreshTokens;
using Boardgame.Application.Authentication.Commands.Register;
using Boardgame.Application.Authentication.Commands.ResetPassword;
using Boardgame.Application.Authentication.Common;
using Boardgame.Application.Authentication.Queries.ForgetPassword;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Users.Common;
using Boardgame.Contracts.Authentication.Requests;
using Boardgame.Contracts.Authentication.Response;
using Boardgame.Contracts.Services.Users.Response;
using Boardgame.Domain.Common.Errors;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/authentication")]
public class AuthenticationController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public AuthenticationController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }


    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var requestRegister = _mapper.Map<RegisterCommand>(request);

        ErrorOr<AuthenticationResult> authResult = await _mediator.Send(requestRegister);

        return authResult.Match(
            authResult => Ok(_mapper.Map<AuthenticationResponse>(authResult)),
            error => Problem(error)
        );
    }


    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var requestLogin = _mapper.Map<LoginCommand>(request);
        ErrorOr<AuthenticationResult> authResult = await _mediator.Send(requestLogin);

        if (authResult.IsError && authResult.FirstError == Errors.Authentication.InvalidCredentials)
        {
            return Problem(
                statusCode: StatusCodes.Status401Unauthorized,
                title: authResult.FirstError.Description);
        }

        return authResult.Match(
            authResult => Ok(_mapper.Map<AuthenticationResponse>(authResult)),
            error => Problem(error)
        );

    }


    [AllowAnonymous]
    [HttpPost("refreshToken")]
    public async Task<IActionResult> RefreshToken(RefreshTokenRequest request)
    {
        var requestRefreshToken = _mapper.Map<RefreshTokenCommand>(request);

        ErrorOr<AuthenticationWithRefreshTokenResult> authRefreshResult = await _mediator.Send(requestRefreshToken);

        return authRefreshResult.Match(
            authRefreshResult => Ok(_mapper.Map<AuthenticationWithRefreshTokenResponse>(authRefreshResult)),
            error => Problem(error)
        );

    }


    [AllowAnonymous]
    [HttpPost("findEmail-forgetPassword")]
    public async Task<IActionResult> FindEmailForResetPassword(ForgetPasswordFindEmailRequest request)
    {
        var requestFindUserByEmail = _mapper.Map<ForgetPasswordFindEmailQuery>(request);

        ErrorOr<UserResult> userResult = await _mediator.Send(requestFindUserByEmail);

        return userResult.Match(
            userResult => Ok(_mapper.Map<UserResponse>(userResult)),
            error => Problem(error)
        );
    }


    [AllowAnonymous]
    [HttpPost("forgetPassword-sentEmail")]
    public async Task<IActionResult> ForgetPasswordSendEmail(ForgetPasswordSendEmailRequest request)
    {
        var requestSendEmail = _mapper.Map<ForgetPasswordSendEmailQuery>(request);

        ErrorOr<bool> resultSendEmail = await _mediator.Send(requestSendEmail);

        return resultSendEmail.Match(
            resultSendEmail => Ok(new { message = $"Email already send to {request.Email}." }),
            error => Problem(error)
        );
    }


    [AllowAnonymous]
    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        var requestResetPassword = _mapper.Map<ResetPasswordCommand>(request);

        ErrorOr<bool> resultResetPassword = await _mediator.Send(requestResetPassword);

        return resultResetPassword.Match(
            resultResetPassword => Ok(new { message = "Reset password success." }),
            error => Problem(error)
        );
    }


    [Authorize(Roles = RoleKeys.Admin)]
    [HttpPost("gm/register-gm")]
    public async Task<IActionResult> AddGm(RegisterGmRequest request)
    {
        var requestGm = _mapper.Map<RegisterGmCommand>(request);

        ErrorOr<bool> resultRegisterGm = await _mediator.Send(requestGm);

        return resultRegisterGm.Match(
            resultRegisterGm => Ok(new { message = "Register gm success." }),
            error => Problem(error));
    }


    [AllowAnonymous]
    [HttpPost("admin/register-admin")]
    public async Task<IActionResult> AddAdmin(RegisterAdminRequest request)
    {
        var requestAdmin = _mapper.Map<RegisterAdminCommand>(request);

        ErrorOr<bool> resultRegisterAdmin = await _mediator.Send(requestAdmin);

        return resultRegisterAdmin.Match(
            resultRegisterAdmin => Ok(new { message = "Register admin success." }),
            error => Problem(error));
    }

}