using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Work
    {
        public static Error DuplicateUserEnterToWork => Error.Conflict(
            code: "Work.DuplicateWork",
            description: "Work has already online");
    }
}