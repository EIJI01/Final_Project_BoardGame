using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record CheckoutCommand(
    string ScanSystemId,
    int TotalPrice) : IRequest<ErrorOr<bool>>;