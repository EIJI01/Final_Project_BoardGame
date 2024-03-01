namespace Boardgame.Contracts.Services.ScanSystems.Requests;

public record AddScanSystemByNumberRequest(
    string CardNumber,
    string TableId);