using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Domain.Entities.Common;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class QueueRepository : IQueueRepository
{
    private readonly DataContext _dataContext;

    public QueueRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> CreateQueueAsync(Queue queue)
    {
        await _dataContext.Queues!.AddAsync(queue);
        return await Save();
    }

    public async Task<List<Queue>> GetAllQueuesAsync()
    {
        return await _dataContext.Queues!.ToListAsync();
    }

    public async Task<List<Queue>> GetListQueueByBranch(Guid branchId)
    {
        return await _dataContext.Queues!.Where(q => q.BranchId == branchId).ToListAsync();
    }

    public async Task<Queue?> GetQueueById(Guid id)
    {
        return await _dataContext.Queues!.FirstOrDefaultAsync(q => q.Id == id);
    }

    public async Task<Queue?> GetQueueByUserInQueueAndWaiting(Guid userId)
    {
        return await _dataContext.Queues!.FirstOrDefaultAsync(q => q.UserId == userId && q.Status != QueueStatus.Offline);
    }

    public async Task<Queue?> GetQueueInformationAsync(Guid userId)
    {
        return await _dataContext.Queues!.FirstOrDefaultAsync(q => q.UserId == userId && q.Status != QueueStatus.Offline);
    }

    public async Task<bool> UpdateQueue(Queue queue)
    {
        _dataContext.Queues!.Update(queue);
        return await Save();
    }

    private async Task<bool> Save()
    {
        var result = await _dataContext.SaveChangesAsync();
        return result > 0;
    }
}
