using Boardgame.Application.Services.Users.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Users.Query;

public record GetAllMemberQuery() : IRequest<ErrorOr<List<UserResult>>>;