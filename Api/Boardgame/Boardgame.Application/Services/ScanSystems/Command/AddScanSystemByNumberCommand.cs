using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record AddScanSystemByNumberCommand(
    string CardNumber,
    string TableId) : IRequest<ErrorOr<bool>>;