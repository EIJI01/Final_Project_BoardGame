using Boardgame.Application.Services.ScanSystems.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Query;

public record GetScanByCardIdAndTrueQuery(
    string CardId) : IRequest<ErrorOr<ScanSystemResult>>;