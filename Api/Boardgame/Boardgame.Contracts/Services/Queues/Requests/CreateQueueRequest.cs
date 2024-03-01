namespace Boardgame.Contracts.Services.Queues.Requests;

public record CreateQueueRequest(
    string Email,
    int TableType,
    int NumberOfPeople,
    string BranchId);