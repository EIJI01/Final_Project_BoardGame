using Boardgame.Application.Services._Branchs.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services._Branchs.Query;

public record GetAllBranchQuery() : IRequest<ErrorOr<List<BranchResult>>>;