using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Command;

public record ChangeTableCommand(
    string ScanSystemId,
    string TableId) : IRequest<ErrorOr<bool>>;