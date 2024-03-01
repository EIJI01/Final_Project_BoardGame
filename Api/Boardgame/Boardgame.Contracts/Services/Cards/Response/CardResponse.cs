namespace Boardgame.Contracts.Services.Cards.Response;

public record CardResponse(
    string Id,
    string CardNumber,
    string BranchId);