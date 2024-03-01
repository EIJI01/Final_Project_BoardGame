using Boardgame.Application.Services.Tables.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Tables.Query;

public record GetTableFromIdQuery(
    string TableId) : IRequest<ErrorOr<TableResult>>;