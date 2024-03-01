using Boardgame.Application.Services.Tables.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Tables.Query;

public record GetAllTablesFromBranchIdQuery(
    string BranchId) : IRequest<ErrorOr<List<TableResult>>>;