using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Table
    {
        public static Error TableNotFound => Error.NotFound(
            code: "Table.NotFound",
            description: "Table has not exist.");

        public static Error IdConflict => Error.Conflict(
            code: "Id.NotValid",
            description: "Id is not Guid.");
    }
}