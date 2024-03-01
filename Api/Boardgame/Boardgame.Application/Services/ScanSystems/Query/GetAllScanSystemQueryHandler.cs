using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.ScanSystems.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Query;

public class GetAllScanSystemQueryHandler : IRequestHandler<GetAllScanSystemQuery, ErrorOr<List<ScanSystemResult>>>
{
    private readonly IScanSystemRepository _scanSystemRepository;

    public GetAllScanSystemQueryHandler(IScanSystemRepository scanSystemRepository)
    {
        _scanSystemRepository = scanSystemRepository;
    }

    public async Task<ErrorOr<List<ScanSystemResult>>> Handle(GetAllScanSystemQuery request, CancellationToken cancellationToken)
    {
        var resultList = await _scanSystemRepository.GetAll();

        var ScanSystemResults = resultList.Select(
                result => new ScanSystemResult(result));

        return ScanSystemResults.ToList();
    }
}
