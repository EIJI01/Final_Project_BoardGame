using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Tables.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Tables.Query;

public class GetTableFromIdQueryHandler : IRequestHandler<GetTableFromIdQuery, ErrorOr<TableResult>>
{
    private readonly ITableRepository _tableRepository;

    public GetTableFromIdQueryHandler(ITableRepository tableRepository)
    {
        _tableRepository = tableRepository;
    }

    public async Task<ErrorOr<TableResult>> Handle(GetTableFromIdQuery request, CancellationToken cancellationToken)
    {
        if (request.TableId is null)
        {
            return Errors.Table.TableNotFound;
        }

        if (!Guid.TryParse(request.TableId, out Guid outputTableGuid))
        {
            return Errors.Table.IdConflict;
        }

        if (await _tableRepository.GetTableById(outputTableGuid) is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        return new TableResult(table);
    }
}
