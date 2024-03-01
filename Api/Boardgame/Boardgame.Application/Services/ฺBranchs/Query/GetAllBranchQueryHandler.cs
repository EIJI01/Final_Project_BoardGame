using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services._Branchs.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services._Branchs.Query;

public class GetAllBranchQueryHandler : IRequestHandler<GetAllBranchQuery, ErrorOr<List<BranchResult>>>
{
    private readonly IBranchRepository _branchRepository;

    public GetAllBranchQueryHandler(IBranchRepository branchRepository)
    {
        _branchRepository = branchRepository;
    }

    public async Task<ErrorOr<List<BranchResult>>> Handle(GetAllBranchQuery request, CancellationToken cancellationToken)
    {
        var resultList = await _branchRepository.GetAll();

        var branchResults = resultList.Select(
                result => new BranchResult(result));

        return branchResults.ToList();
    }
}
