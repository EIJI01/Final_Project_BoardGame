using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class User
    {
        public static Error DuplicateEmail => Error.Conflict(
            code: "User.DuplicateEmail",
            description: "Email is already in use.");

        public static Error NotFoundEmail => Error.NotFound(
            code: "User.NotFoundEmail",
            description: "Email has not exist."
        );
        public static Error UserNotFound => Error.NotFound(
            code: "User.NotFound",
            description: "User has not exist."
        );
    }
}