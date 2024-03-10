using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.ScanSystems.Common;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;
using Boardgame.Domain.Common.Errors;

namespace Boardgame.Application.Services.ScanSystems.Query;

public class GetScanByCardNumberAndTrueQueryHandler : IRequestHandler<GetScanByCardNumberAndTrueQuery, ErrorOr<ScanSystemResult>>
{
    private readonly ICardRepository _cardRepository;
    private readonly IScanSystemRepository _scanSystemRepository;

    public GetScanByCardNumberAndTrueQueryHandler(IScanSystemRepository scanSystemRepository, ICardRepository cardRepository)
    {
        _scanSystemRepository = scanSystemRepository;
        _cardRepository = cardRepository;
    }

    public async Task<ErrorOr<ScanSystemResult>> Handle(GetScanByCardNumberAndTrueQuery request, CancellationToken cancellationToken)
    {

        if (await _cardRepository.GetCardByNumber(request.CardNumber) is not Card card)
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
