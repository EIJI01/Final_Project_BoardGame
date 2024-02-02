using Boardgame.Application.Authentication.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Queries.Login;

public record LoginQuery(
    string Email,
    string Password) :
    IRequest<ErrorOr<AuthenticationResult>>;