using Boardgame.Domain.Entities;

namespace Boardgame.Application.Services.ScanSystems.Common;

public record ScanSystemWithCardResult(
    ScanSystem ScanSystem,
    Card Card);