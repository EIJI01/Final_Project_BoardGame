using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class WorkRepository : IWorkRepository
{
    private readonly DataContext _dataContext;

    public WorkRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> AddWork(Work work)
    {
        await _dataContext.Works!.AddAsync(work);
        return await Save();
    }

    public async Task<Work?> GetWorkOfUserId(Guid id)
    {
        return await _dataContext.Works!.Where(
            w => w.UserId == id &&
            w.Status == true)
            .FirstOrDefaultAsync();
    }

    private async Task<bool> Save()
    {
        var result = await _dataContext.SaveChangesAsync();
        return result > 0;
    }
}
