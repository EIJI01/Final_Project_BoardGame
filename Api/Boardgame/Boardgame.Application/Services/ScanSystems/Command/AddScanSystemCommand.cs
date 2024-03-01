using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record AddScanSystemCommand(
    string CardId,
    string TableId) : IRequest<ErrorOr<bool>>;