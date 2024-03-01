using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Card
    {
        public static Error CardNotFound => Error.NotFound(
            code: "Card.NotFound",
            description: "Card has not exist.");

        public static Error IdConflict => Error.Conflict(
            code: "Id.NotValid",
            description: "Id is not Guid.");

        public static Error DuplicateCard => Error.Conflict(
            code: "Card.DuplicateCard",
            description: "Card already in use.");
    }
}