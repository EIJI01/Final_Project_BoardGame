namespace Boardgame.Contracts.Services.ScanSystems.Requests;

public record AddScanSystemRequest(
    string TableId,
    string CardId);