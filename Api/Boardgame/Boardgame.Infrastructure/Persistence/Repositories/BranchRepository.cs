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

    public async Task<bool> CreateBranch(Branch branch)
    {
        await _dataContext.Branches!.AddAsync(branch);
        return await Save();
    }

    public async Task<List<Branch>> GetAll()
    {
        return await _dataContext.Branches!.ToListAsync();
    }

    public async Task<Branch?> GetBranchByBranchName(string branchName)
    {
        return await _dataContext.Branches!.FirstOrDefaultAsync(b => b.BranchName == branchName);
    }

    public async Task<Branch?> GetBranchById(Guid id)
    {
        return await _dataContext.Branches!.SingleOrDefaultAsync(b => b.Id == id);
    }

    private async Task<bool> Save()
    {
        var result = await _dataContext.SaveChangesAsync();
        return result > 0;
    }
}
