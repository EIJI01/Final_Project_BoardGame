using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class BranchRepository : IBranchRepository
{
    private readonly DataContext _dataContext;

    public BranchRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Branch>> GetAll()
    {
        return await _dataContext.Branches!.ToListAsync();
    }

    public async Task<Branch?> GetBranchById(Guid id)
    {
        return await _dataContext.Branches!.SingleOrDefaultAsync(b => b.Id == id);
    }
}
