using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class Notification
    {
        public static Error DuplicateSendNotifyUser => Error.Conflict(
            code: "Duplicate.Notify",
            description: "This user already send message.");

        public static Error NotificationNotFound => Error.NotFound(
            code: "NotFound.Notification",
            description: "Notification has not exist.");
    }
}