using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface ITableRepository
{
    Task<List<TablePlay>> GetAllTablesFromBranchId(Guid branchId);
    Task<TablePlay?> GetTableById(Guid tableId);
}