using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Branch
    {
        public static Error NotFound => Error.NotFound(
            code: "Branch.NotFound",
            description: "Branch has not exist.");

        public static Error IdConflict => Error.Conflict(
            code: "Id.NotValid",
            description: "Id is not Guid.");

        public static Error DuplicateBranch => Error.Conflict(
            code: "Duplicate.Branch",
            description: "Branch is already exist.");
    }
}