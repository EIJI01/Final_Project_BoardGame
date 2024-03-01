using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IQueueRepository
{
    Task<bool> CreateQueueAsync(Queue queue);
    Task<Queue?> GetQueueInformationAsync(Guid userId);
    Task<List<Queue>> GetAllQueuesAsync();
}