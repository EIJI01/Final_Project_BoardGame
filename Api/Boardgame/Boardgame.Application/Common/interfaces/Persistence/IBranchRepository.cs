using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IBranchRepository
{
    Task<Branch?> GetBranchById(Guid id);
    Task<List<Branch>> GetAll();
    Task<Branch?> GetBranchByBranchName(string branchName);
    Task<bool> CreateBranch(Branch branch);
}