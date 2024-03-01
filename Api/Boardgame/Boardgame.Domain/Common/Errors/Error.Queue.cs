using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Queue
    {
        public static Error QueueNotFound => Error.NotFound(
            code: "Queue.NotFound",
            description: "Queue is not exist.");

    }
}