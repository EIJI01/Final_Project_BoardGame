using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.ScanSystems.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Query;

public class GetScanByCardIdAndTrueQueryHandler : IRequestHandler<GetScanByCardIdAndTrueQuery, ErrorOr<ScanSystemResult>>
{
    private readonly IScanSystemRepository _scanSystemRepository;
    private readonly ICardRepository _cardRepository;

    public GetScanByCardIdAndTrueQueryHandler(IScanSystemRepository scanSystemRepository, ICardRepository cardRepository)
    {
        _scanSystemRepository = scanSystemRepository;
        _cardRepository = cardRepository;
    }

    public async Task<ErrorOr<ScanSystemResult>> Handle(GetScanByCardIdAndTrueQuery request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.CardId, out Guid guidCard))
        {
            return Errors.Card.CardNotFound;
        }

        if (await _cardRepository.GetCardById(guidCard) is not Card card)
        {
            return Errors.Card.CardNotFound;
        }

        if (await _scanSystemRepository.GetScanSystemByCardIdStatusTrue(card.Id) is not ScanSystem scanSystem)
        {
            return Errors.ScanSystem.NotFound;
        }

        return new ScanSystemResult(scanSystem);
    }
}
