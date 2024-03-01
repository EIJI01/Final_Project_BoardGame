namespace Boardgame.Contracts.Services.Branchs.Response;

public record BranchResponse(
    Guid Id,
    string Address,
    string BranchName,
    decimal PlayPricePerHour,
    decimal BuffetPrice);