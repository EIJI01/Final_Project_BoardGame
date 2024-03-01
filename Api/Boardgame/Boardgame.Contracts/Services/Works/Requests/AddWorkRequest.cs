namespace Boardgame.Contracts.Services.Works.Requests;

public record AddWorkRequest(
    Guid? UserId,
    Guid BranchId);