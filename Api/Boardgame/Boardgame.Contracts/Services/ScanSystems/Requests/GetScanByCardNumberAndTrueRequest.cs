namespace Boardgame.Contracts.Services.ScanSystems.Requests;

public record GetScanByCardNumberAndTrueRequest(
    string CardNumber);