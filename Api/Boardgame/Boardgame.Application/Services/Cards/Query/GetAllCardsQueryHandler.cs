using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Cards.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Cards.Query;

public class GetAllCardsQueryHandler : IRequestHandler<GetAllCardsQuery, ErrorOr<List<CardResult>>>
{
    private readonly ICardRepository _cardRepository;

    public GetAllCardsQueryHandler(ICardRepository cardRepository)
    {
        _cardRepository = cardRepository;
    }

    public async Task<ErrorOr<List<CardResult>>> Handle(GetAllCardsQuery request, CancellationToken cancellationToken)
    {
        var result = await _cardRepository.GetAllCards();

        var resultList = result.Select(data => new CardResult(data));

        return resultList.ToList();
    }
}
