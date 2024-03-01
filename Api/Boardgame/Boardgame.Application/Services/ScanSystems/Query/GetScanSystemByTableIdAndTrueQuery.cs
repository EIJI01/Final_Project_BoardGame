using Boardgame.Application.Services.ScanSystems.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.ScanSystems.Query;

public record GetScanSystemByTableIdAndTrueQuery(
    string TableId) : IRequest<ErrorOr<List<ScanSystemWithCardResult>>>;