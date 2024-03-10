using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class ScanSystemRepository : IScanSystemRepository
{
    private readonly DataContext _dataContext;

    public ScanSystemRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> AddScanSystemCard(ScanSystem scanSystem)
    {
        await _dataContext.ScanSystems!.AddAsync(scanSystem);
        return await Save();
    }

    public async Task<bool> DeleteScanSystem(ScanSystem scanSystem)
    {
        _dataContext.ScanSystems!.Remove(scanSystem);
        return await Save();
    }

    public async Task<List<ScanSystem>> GetAll()
    {
        return await _dataContext.ScanSystems!.ToListAsync();
    }

    public async Task<List<ScanSystem>> GetAllByTableId(Guid tableId)
    {
        return await _dataContext.ScanSystems!.Where(s => s.TableId == tableId && s.Status == true).ToListAsync();
    }

    public async Task<List<ScanSystem>> GetScanSystemByCardIdAndStatusIsTrue(Guid cardId)
    {
        return await _dataContext.ScanSystems!.Where(s => s.CardId == cardId && s.Status == true).ToListAsync();
    }

    public async Task<ScanSystem?> GetScanSystemByCardIdStatusTrue(Guid cardId)
    {
        return await _dataContext.ScanSystems!.FirstOrDefaultAsync(s => s.CardId == cardId && s.Status == true);
    }

    public async Task<ScanSystem?> GetScanSystemById(Guid scanSystemId)
    {
        return await _dataContext.ScanSystems!.FirstOrDefaultAsync(s => s.Id == scanSystemId);
    }

    public async Task<bool> UpdateScanSystem(ScanSystem scanSystem)
    {
        _dataContext.ScanSystems!.Update(scanSystem);
        return await Save();
    }

    private async Task<bool> Save()
    {
        var result = await _dataContext.SaveChangesAsync();
        return result > 0;
    }
}
