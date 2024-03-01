using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.ScanSystems.Common;
using ErrorOr;
using MediatR;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;

namespace Boardgame.Application.Services.ScanSystems.Query;

public class GetScanSystemByTableIdAndTrueQueryHandler : IRequestHandler<GetScanSystemByTableIdAndTrueQuery, ErrorOr<List<ScanSystemWithCardResult>>>
{
    private readonly IScanSystemRepository _scanSystemRepository;
    private readonly ITableRepository _tableRepository;
    private readonly ICardRepository _cardRepository;

    public GetScanSystemByTableIdAndTrueQueryHandler(IScanSystemRepository scanSystemRepository, ITableRepository tableRepository, ICardRepository cardRepository)
    {
        _scanSystemRepository = scanSystemRepository;
        _tableRepository = tableRepository;
        _cardRepository = cardRepository;

    }

    public async Task<ErrorOr<List<ScanSystemWithCardResult>>> Handle(GetScanSystemByTableIdAndTrueQuery request, CancellationToken cancellationToken)
    {
        if (request.TableId is null)
        {
            return Errors.ScanSystem.IdIsNullable;
        }

        if (!Guid.TryParse(request.TableId, out Guid tableId))
        {
            return Errors.Table.IdConflict;
        }

        if (await _tableRepository.GetTableById(tableId) is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        var resultListByTableId = await _scanSystemRepository.GetAllByTableId(table.Id);

        if (resultListByTableId.Count <= 0)
        {
            return new List<ScanSystemWithCardResult>();
        }

        var ScanSystemResults = resultListByTableId.Select(result =>
        {
            var card = _cardRepository.GetCardById(result.CardId).Result;
            return new ScanSystemWithCardResult(ScanSystem: result, Card: card!);
        });
        var finalResult = ScanSystemResults.ToList();

        return finalResult;
    }
}
