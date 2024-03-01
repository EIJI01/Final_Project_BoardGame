using Boardgame.Domain.Entities;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface ICardRepository
{
    Task<Card?> GetCardById(Guid id);
    Task<Card?> GetCardByNumber(string number);
}