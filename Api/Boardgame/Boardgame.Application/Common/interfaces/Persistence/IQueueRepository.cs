using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IQueueRepository
{
    Task<bool> CreateQueueAsync(Queue queue);
    Task<Queue?> GetQueueInformationAsync(Guid userId);
    Task<List<Queue>> GetAllQueuesAsync();
    Task<List<Queue>> GetListQueueByBranch(Guid branchId);
    Task<Queue?> GetQueueByUserInQueueAndWaiting(Guid userId);
    Task<Queue?> GetQueueById(Guid id);
    Task<bool> UpdateQueue(Queue queue);
}