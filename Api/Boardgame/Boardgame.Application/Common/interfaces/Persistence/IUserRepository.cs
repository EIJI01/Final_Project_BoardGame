using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IUserRepository
{
    User? GetUserByEmail(string email);
    void Add(User user);
}