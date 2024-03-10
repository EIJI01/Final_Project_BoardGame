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

        if (await _queueRepository.GetQueueByUserInQueueAndWaiting(user.Id) is not null)
        {
            return Errors.Queue.DuplicateQueue;
        }

        var queues = await _queueRepository.GetListQueueByBranch(branch.Id);

        List<Queue> queueNintendo = queues.Where(q => q.TableType == TableType.Nintendo).ToList();

        List<Queue> queueTable = queues.Where(q => q.TableType == TableType.Table).ToList();

        if ((TableType)request.TableType == TableType.Table)
        {
            var TableQueue = new Queue
            {
                BranchId = branch.Id,
                UserId = user.Id,
                TableType = (TableType)request.TableType,
                NumberOfPeople = request.NumberOfPeople,
                Status = QueueStatus.InQueue,
                CreateAt = _dateTimeProvider.UtcNow.ToLocalTime(),
                QueueNumber = $"BGT{queueTable.Count + 1}"
            };

            var resultCreateQueue = await _queueRepository.CreateQueueAsync(TableQueue);

            if (resultCreateQueue is false)
            {
                return Error.Failure(code: "FailToCreate.", description: "Can not create queue.");
            }
            return new QueueResult(
                TableQueue);
        }
        else
        {
            var NintendoQueue = new Queue
            {
                BranchId = branch.Id,
                UserId = user.Id,
                TableType = (TableType)request.TableType,
                NumberOfPeople = request.NumberOfPeople,
                Status = QueueStatus.InQueue,
                CreateAt = _dateTimeProvider.UtcNow.ToLocalTime(),
                QueueNumber = $"BGN{queueNintendo.Count + 1}"
            };
            var resultCreateQueue = await _queueRepository.CreateQueueAsync(NintendoQueue);

            if (resultCreateQueue is false)
            {
                return Error.Failure(code: "FailToCreate.", description: "Can not create queue.");
            }
            return new QueueResult(
                NintendoQueue);
        }
    }
}
