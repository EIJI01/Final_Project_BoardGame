using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Application.Services.Queues.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Queues.Command;

public class CreateQueueCommandHandler : IRequestHandler<CreateQueueCommand, ErrorOr<QueueResult>>
{
    private readonly IUserRepository _userRepository;
    private readonly IQueueRepository _queueRepository;
    private readonly IBranchRepository _branchRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    public CreateQueueCommandHandler(IQueueRepository queueRepository, IUserRepository userRepository, IBranchRepository branchRepository, IDateTimeProvider dateTimeProvider)
    {
        _queueRepository = queueRepository;
        _userRepository = userRepository;
        _branchRepository = branchRepository;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<ErrorOr<QueueResult>> Handle(CreateQueueCommand request, CancellationToken cancellationToken)
    {
        if (!Guid.TryParse(request.BranchId, out Guid guidResult))
        {
            return Errors.Branch.NotFound;
        }

        if (await _userRepository.GetUserByEmailAsync(request.Email)! is not UserIdentity user)
        {
            return Errors.User.NotFoundEmail;
        }

        if (await _branchRepository.GetBranchById(guidResult) is not Branch branch)
        {
            return Errors.Branch.NotFound;
        }

        var queues = await _queueRepository.GetAllQueuesAsync();

        var queue = new Queue
        {
            BranchId = branch.Id,
            UserId = user.Id,
            TableType = (TableType)request.TableType,
            NumberOfPeople = request.NumberOfPeople,
            Status = true,
            CreateAt = _dateTimeProvider.UtcNow,
            QueueNumber = $"BGQ{queues.Count + 1}"
        };

        var resultCreateQueue = await _queueRepository.CreateQueueAsync(queue);

        if (resultCreateQueue is false)
        {
            return Error.Failure(code: "FailToCreate.", description: "Can not create queue.");
        }

        return new QueueResult(
            queue);


    }
}
