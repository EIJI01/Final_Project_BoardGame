using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Tables.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Tables.Query;

public class GetAllTablesFromBranchIdQueryHandler : IRequestHandler<GetAllTablesFromBranchIdQuery, ErrorOr<List<TableResult>>>
{
    private readonly ITableRepository _tableRepository;
    private readonly IBranchRepository _branchRepository;

    public GetAllTablesFromBranchIdQueryHandler(ITableRepository tableRepository, IBranchRepository branchRepository)
    {
        _tableRepository = tableRepository;
        _branchRepository = branchRepository;
    }

    // private readonly 
    public async Task<ErrorOr<List<TableResult>>> Handle(GetAllTablesFromBranchIdQuery request, CancellationToken cancellationToken)
    {
        if (request.BranchId is null)
        {
            return Errors.Branch.NotFound;
        }

        if (!Guid.TryParse(request.BranchId, out Guid outputGuid))
        {
            return Error.Conflict(code: "Id.NotValid", description: "Id is not Guid.");
        }

        if (await _branchRepository.GetBranchById(outputGuid) is not Branch branch)
        {
            return Errors.Branch.NotFound;
        }

        var result = await _tableRepository.GetAllTablesFromBranchId(branch.Id);

        var resultTableList = result.Select(t => new TableResult(t));

        return resultTableList.ToList();
    }
}
