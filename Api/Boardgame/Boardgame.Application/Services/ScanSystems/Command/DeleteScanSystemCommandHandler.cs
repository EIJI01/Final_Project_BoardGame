using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public class DeleteScanSystemCommandHandler : IRequestHandler<DeleteScanSystemCommand, ErrorOr<bool>>
{
    private readonly IScanSystemRepository _scanSystemRepository;

    public DeleteScanSystemCommandHandler(IScanSystemRepository scanSystemRepository)
    {
        _scanSystemRepository = scanSystemRepository;
    }

    public async Task<ErrorOr<bool>> Handle(DeleteScanSystemCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.ScanSystemId, out Guid guidScanSystemId))
        {
            return Errors.ScanSystem.NotFound;
        }

        if (await _scanSystemRepository.GetScanSystemById(guidScanSystemId) is not ScanSystem scanSystem)
        {
            return Errors.ScanSystem.NotFound;
        }

        var result = await _scanSystemRepository.DeleteScanSystem(scanSystem);

        if (result is false)
        {
            return Error.Failure(code: "ScanSystem.FailToDelete", description: "Can not delete scanSystem.");
        }

        return true;
    }
}
