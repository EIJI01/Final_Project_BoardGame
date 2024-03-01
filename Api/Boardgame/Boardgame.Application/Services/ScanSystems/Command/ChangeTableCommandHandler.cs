using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public class ChangeTableCommandHandler : IRequestHandler<ChangeTableCommand, ErrorOr<bool>>
{
    private readonly IScanSystemRepository _scanSystemRepository;
    private readonly ITableRepository _tableRepository;
    public ChangeTableCommandHandler(IScanSystemRepository scanSystemRepository, ITableRepository tableRepository)
    {
        _scanSystemRepository = scanSystemRepository;
        _tableRepository = tableRepository;
    }

    public async Task<ErrorOr<bool>> Handle(ChangeTableCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.ScanSystemId, out Guid guidScanSystemId) || !Guid.TryParse(request.TableId, out Guid guidTableId))
        {
            return Errors.ScanSystem.NotFound;
        }

        if (await _scanSystemRepository.GetScanSystemById(guidScanSystemId) is not ScanSystem scanSystems)
        {
            return Errors.ScanSystem.NotFound;
        }

        if (await _tableRepository.GetTableById(guidTableId) is not TablePlay table)
        {
            return Errors.Table.TableNotFound;
        }

        scanSystems.TableId = table.Id;
        var result = await _scanSystemRepository.UpdateScanSystem(scanSystems);

        if (result is false)
        {
            return Error.Failure(code: "ScanSystem.FailToUpdate", description: "Can not update ScanSystem");
        }

        return true;
    }
}
