using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using ErrorOr;
using MediatR;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;

namespace Boardgame.Application.Services.ScanSystems.Command;

public class AddScanSystemByNumberCommandHandler : IRequestHandler<AddScanSystemByNumberCommand, ErrorOr<bool>>
{
    private readonly ITableRepository _tableRepository;
    private readonly ICardRepository _cardRepository;
    private readonly IScanSystemRepository _scanSystemRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    public AddScanSystemByNumberCommandHandler(ITableRepository tableRepository, ICardRepository cardRepository, IScanSystemRepository scanSystemRepository, IDateTimeProvider dateTimeProvider)
    {
        _tableRepository = tableRepository;
        _cardRepository = cardRepository;
        _scanSystemRepository = scanSystemRepository;
        _dateTimeProvider = dateTimeProvider;

    }

    public async Task<ErrorOr<bool>> Handle(AddScanSystemByNumberCommand request, CancellationToken cancellationToken)
    {
        if (request.CardNumber is null)
        {
            return Errors.Card.CardNotFound;
        }

        if (request.TableId is null)
        {
            return Errors.Table.TableNotFound;
        }

        if (!Guid.TryParse(request.TableId, out Guid outputTableId))
        {
            return Errors.Table.IdConflict;
        }

        if (await _tableRepository.GetTableById(outputTableId) is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        if (await _cardRepository.GetCardByNumber(request.CardNumber) is not Card card)
        {
            return Errors.Card.CardNotFound;
        }

        if (!card.BranchId.Equals(table.BranchId))
        {
            return Error.Conflict(
                code: "Card.Conflict",
                description: $"Card's branch is not match Table's branch");
        }

        if ((await _scanSystemRepository.GetScanSystemByCardIdAndStatusIsTrue(card.Id)).Count > 0)
        {
            return Errors.Card.DuplicateCard;
        }

        var newScan = new ScanSystem
        {
            StartTime = DateTime.UtcNow.ToLocalTime(),
            Status = true,
            TableId = table.Id,
            CardId = card.Id

        };

        var result = await _scanSystemRepository.AddScanSystemCard(newScan);

        if (!result)
        {
            return Error.Failure(
                code: "Card.AddFailed",
                description: "Can not add card.");
        }

        return true;
    }
}
