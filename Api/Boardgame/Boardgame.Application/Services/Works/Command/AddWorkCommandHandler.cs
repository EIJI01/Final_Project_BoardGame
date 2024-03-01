using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Works.Command;

public class AddWorkCommandHandler : IRequestHandler<AddWorkCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IBranchRepository _branchRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IWorkRepository _workRepository;
    public AddWorkCommandHandler(IUserRepository userRepository, IBranchRepository branchRepository, IDateTimeProvider dateTimeProvider, IWorkRepository workRepository)
    {
        _userRepository = userRepository;
        _branchRepository = branchRepository;
        _dateTimeProvider = dateTimeProvider;
        _workRepository = workRepository;
    }

    public async Task<ErrorOr<bool>> Handle(AddWorkCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepository.GetUserByIdAsync(request.UserId)! is not UserIdentity user)
        {
            return Errors.User.UserNotFound;
        }

        if (await _branchRepository.GetBranchById(request.BranchId) is not Branch branch)
        {
            return Errors.Branch.NotFound;
        }

        if (await _workRepository.GetWorkOfUserId(user.Id) is not null)
        {
            return Errors.Work.DuplicateUserEnterToWork;
        }

        var work = new Work
        {
            BranchId = branch.Id,
            UserId = user.Id,
            TimeIn = _dateTimeProvider.UtcNow,
            Status = true
        };

        var result = await _workRepository.AddWork(work);

        if (!result)
        {
            return Error.Failure(code: "Work.AddFailed", description: "Enter to work failed.");
        }

        Console.WriteLine(user.Name);

        return true;
    }
}
