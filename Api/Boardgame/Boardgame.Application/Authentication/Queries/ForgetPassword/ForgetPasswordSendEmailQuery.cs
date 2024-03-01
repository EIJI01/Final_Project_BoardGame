using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Queries.ForgetPassword;

public record ForgetPasswordSendEmailQuery(
    string Email) : IRequest<ErrorOr<bool>>;