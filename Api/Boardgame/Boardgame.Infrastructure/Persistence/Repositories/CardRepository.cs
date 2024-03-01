using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class CardRepository : ICardRepository
{
    private readonly DataContext _dataContext;

    public CardRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Card?> GetCardById(Guid id)
    {
        return await _dataContext.Cards!.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Card?> GetCardByNumber(string number)
    {
        return await _dataContext.Cards!.FirstOrDefaultAsync(c => c.CardNumber == number.ToUpper());
    }
}
