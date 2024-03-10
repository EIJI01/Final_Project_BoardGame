namespace Boardgame.Contracts.Services.ScanSystems.Requests;

public record CheckoutRequest(
    string ScanSystemId,
    int TotalPrice);