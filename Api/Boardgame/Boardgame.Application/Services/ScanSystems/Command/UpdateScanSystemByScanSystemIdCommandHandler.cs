using System.Globalization;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public class UpdateScanSystemByScanSystemIdCommandHandler : IRequestHandler<UpdateScanSystemByScanSystemIdCommand, ErrorOr<bool>>
{
    private readonly IScanSystemRepository _scanSystemRepository;

    public UpdateScanSystemByScanSystemIdCommandHandler(IScanSystemRepository scanSystemRepository)
    {
        _scanSystemRepository = scanSystemRepository;
    }

    public async Task<ErrorOr<bool>> Handle(UpdateScanSystemByScanSystemIdCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.ScanSystemId, out Guid resultGuid))
        {
            return Errors.ScanSystem.NotFound;
        }

        if (await _scanSystemRepository.GetScanSystemById(resultGuid) is not ScanSystem scanSystems)
        {
            return Errors.ScanSystem.NotFound;
        }

        if (!string.IsNullOrEmpty(request.StartTime))
        {
            DateTime startTime = DateTime.ParseExact(request.StartTime, "yyyy-MM-ddTHH:mm", CultureInfo.InvariantCulture);
            scanSystems.StartTime = startTime;
        }

        if (!string.IsNullOrEmpty(request.StopTime))
        {
            DateTime startTime = DateTime.ParseExact(request.StopTime, "yyyy-MM-ddTHH:mm", CultureInfo.InvariantCulture);
            scanSystems.StartTime = startTime;
        }

        if (request.TotalPrice is not null)
        {
            scanSystems.TotalPrice = (decimal)request.TotalPrice;
        }

        var result = await _scanSystemRepository.UpdateScanSystem(scanSystems);

        if (result is false)
        {
            return Error.Failure(code: "Update.Failed", description: "Can not update scanSystem.");
        }

        return true;

    }
}
