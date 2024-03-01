using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IScanSystemRepository
{
    Task<bool> AddScanSystemCard(ScanSystem scanSystem);
    Task<List<ScanSystem>> GetScanSystemByCardIdAndStatusIsTrue(Guid cardId);
    Task<List<ScanSystem>> GetAll();
    Task<List<ScanSystem>> GetAllByTableId(Guid tableId);
    Task<ScanSystem?> GetScanSystemById(Guid scanSystemId);
    Task<bool> UpdateScanSystem(ScanSystem scanSystem);
    Task<bool> DeleteScanSystem(ScanSystem scanSystem);
}