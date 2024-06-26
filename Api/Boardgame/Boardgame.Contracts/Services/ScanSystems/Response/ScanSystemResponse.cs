using Boardgame.Contracts.Services.Cards.Response;

namespace Boardgame.Contracts.Services.ScanSystems.Response;

public record ScanSystemResponse(
    Guid Id,
    bool Status,
    DateTime StartTime,
    DateTime StopTime,
    decimal TotalPrice,
    Guid TableId,
    Guid CardId);