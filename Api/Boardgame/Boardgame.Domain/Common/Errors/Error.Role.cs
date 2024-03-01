using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Role
    {
        public static Error NotFound => Error.NotFound(
            code: "Role.NotFound.",
            description: "Role does not exist.");

        public static Error DuplicateRole => Error.Conflict(
            code: "Role.DuplicateRole.",
            description: "Role is already exist.");
    }
}