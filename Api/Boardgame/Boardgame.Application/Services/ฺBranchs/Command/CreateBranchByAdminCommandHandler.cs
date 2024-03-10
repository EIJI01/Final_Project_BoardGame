using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services._Branchs.Command;

public class CreateBranchByAdminCommandHandler : IRequestHandler<CreateBranchByAdminCommand, ErrorOr<bool>>
{
    private readonly IBranchRepository _branchRepository;

    public CreateBranchByAdminCommandHandler(IBranchRepository branchRepository)
    {
        _branchRepository = branchRepository;
    }

    public async Task<ErrorOr<bool>> Handle(CreateBranchByAdminCommand request, CancellationToken cancellationToken)
    {
        if (await _branchRepository.GetBranchByBranchName(request.BranchName) is not null)
        {
            return Errors.Branch.DuplicateBranch;
        }

        var branch = new Branch
        {
            BranchName = request.BranchName,
            Address = request.Address,
            BuffetPrice = request.BuffetPrice,
            PlayPricePerHour = request.PlayPricePerHour
        };

        var result = await _branchRepository.CreateBranch(branch);

        if (result is false)
        {
            return Error.Failure(code: "FailedToCreate.", description: "Can not create branch.");
        }

        return true;
    }
}
