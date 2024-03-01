namespace Boardgame.Contracts.Services.Tables.Response;

public record TableResponse(
    Guid Id,
    string TableNumber,
    int Type,
    int Status,
    Guid BranchId);