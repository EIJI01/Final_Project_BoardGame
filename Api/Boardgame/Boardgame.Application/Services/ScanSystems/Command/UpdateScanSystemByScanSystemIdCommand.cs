using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record UpdateScanSystemByScanSystemIdCommand(
    string ScanSystemId,
    string? StartTime,
    string? StopTime,
    int? TotalPrice) : IRequest<ErrorOr<bool>>;