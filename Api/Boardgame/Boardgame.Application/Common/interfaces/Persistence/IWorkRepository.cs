using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IWorkRepository
{
    Task<bool> AddWork(Work work);
    Task<Work?> GetWorkOfUserId(Guid id);
}