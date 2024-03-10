namespace Boardgame.Contracts.Services.Queues.Response;

public record QueueResponse(
    string Id,
    string QueueNumber,
    string CreateAt,
    int TableType,
    int NumberOfPeople,
    int Status,
    string UserId,
    string BranchId,
    string TableId);