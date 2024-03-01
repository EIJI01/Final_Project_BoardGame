using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record DeleteScanSystemCommand(
    string ScanSystemId) : IRequest<ErrorOr<bool>>;