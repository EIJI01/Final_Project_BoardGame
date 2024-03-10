namespace Boardgame.Contracts.Services.ScanSystems.Requests;

public record UpdateScanSystemByScanSystemIdRequest(
    string ScanSystemId,
    string? StartTime,
    string? StopTime,
    int? TotalPrice);