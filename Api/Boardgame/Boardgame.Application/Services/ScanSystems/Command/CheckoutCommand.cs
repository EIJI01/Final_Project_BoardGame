using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record CheckoutCommand(
    string ScanSystemId) : IRequest<ErrorOr<bool>>;