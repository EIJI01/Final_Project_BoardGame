using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class TableRepository : ITableRepository
{
    private readonly DataContext _dataContext;

    public TableRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<TablePlay>> GetAllTablesFromBranchId(Guid branchId)
    {
        return await _dataContext.Tables!.Where(t => t.BranchId == branchId).ToListAsync();
    }

    public async Task<TablePlay?> GetTableById(Guid tableId)
    {
        return await _dataContext.Tables!.FirstOrDefaultAsync(t => t.Id == tableId);
    }
}
