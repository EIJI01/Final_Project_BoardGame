using Boardgame.Application.Services.Users.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Queries.ForgetPassword;

public record ForgetPasswordFindEmailQuery(
    string Email) : IRequest<ErrorOr<UserResult>>;