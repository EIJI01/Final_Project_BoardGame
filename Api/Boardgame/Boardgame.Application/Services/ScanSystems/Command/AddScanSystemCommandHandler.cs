using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public class AddScanSystemCommandHandler : IRequestHandler<AddScanSystemCommand, ErrorOr<bool>>
{

    private readonly ITableRepository _tableRepository;
    private readonly ICardRepository _cardRepository;
    private readonly IScanSystemRepository _scanSystemRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    public AddScanSystemCommandHandler(ITableRepository tableRepository, ICardRepository cardRepository, IScanSystemRepository scanSystemRepository, IDateTimeProvider dateTimeProvider)
    {

        _tableRepository = tableRepository;
        _cardRepository = cardRepository;
        _scanSystemRepository = scanSystemRepository;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<ErrorOr<bool>> Handle(AddScanSystemCommand request, CancellationToken cancellationToken)
    {
        if (request.CardId is null)
        {
            return Errors.Card.CardNotFound;
        }

        if (request.TableId is null)
        {
            return Errors.Table.TableNotFound;
        }

        if (!Guid.TryParse(request.CardId, out Guid outputCardId) || !Guid.TryParse(request.TableId, out Guid outputTableId))
        {
            return Errors.Branch.IdConflict;
        }

        if (await _tableRepository.GetTableById(outputTableId) is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        if (await _cardRepository.GetCardById(outputCardId) is not Card card)
        {
            return Errors.Card.CardNotFound;
        }

        if (!card.BranchId.Equals(table.BranchId))
        {
            return Error.Conflict(
                code: "Card.Conflict",
                description: $"Card's branch is not match Table's branch");
        }

        if ((await _scanSystemRepository.GetScanSystemByCardIdAndStatusIsTrue(outputCardId)).Count > 0)
        {
            return Errors.Card.DuplicateCard;
        }

        var newScan = new ScanSystem
        {
            StartTime = _dateTimeProvider.UtcNow,
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
