using Boardgame.Contracts.Services.Cards.Response;

namespace Boardgame.Contracts.Services.ScanSystems.Response;

public record ScanSystemWithCardResponse(
    Guid Id,
    bool Status,
    DateTime StartTime,
    DateTime StopTime,
    decimal TotalPice,
    Guid TableId,
    CardResponse Card);