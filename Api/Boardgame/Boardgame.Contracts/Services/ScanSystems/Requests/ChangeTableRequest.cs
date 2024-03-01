namespace Boardgame.Contracts.Services.ScanSystems.Requests;

public record ChangeTableRequest(
    string ScanSystemId,
    string TableId);