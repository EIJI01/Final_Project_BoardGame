using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public class CheckoutCommandHandler : IRequestHandler<CheckoutCommand, ErrorOr<bool>>
{
    private readonly IScanSystemRepository _scanSystemRepository;

    public CheckoutCommandHandler(IScanSystemRepository scanSystemRepository)
    {
        _scanSystemRepository = scanSystemRepository;
    }

    public async Task<ErrorOr<bool>> Handle(CheckoutCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.ScanSystemId, out Guid result))
        {
            return Errors.ScanSystem.NotFound;
        }

        if (await _scanSystemRepository.GetScanSystemById(result) is not ScanSystem scanSystem)
        {
            return Errors.ScanSystem.NotFound;
        }

        scanSystem.Status = false;
        var resultUpdate = await _scanSystemRepository.UpdateScanSystem(scanSystem);

        if (resultUpdate is false)
        {
            return Error.Failure(code: "ScanSystem.FailToUpdate", description: "Can not update ScanSystem");
        }

        return true;
    }
}
