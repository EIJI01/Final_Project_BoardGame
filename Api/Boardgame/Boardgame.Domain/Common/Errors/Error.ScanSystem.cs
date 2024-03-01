using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class ScanSystem
    {
        public static Error IdIsNullable => Error.Conflict(
            code: "ScanSystem.IdIsNull",
            description: "Id is null");

        public static Error NotFound => Error.Conflict(
            code: "ScanSystem.NotFound",
            description: "Id not found.");
    }
}