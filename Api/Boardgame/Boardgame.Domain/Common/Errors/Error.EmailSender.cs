using ErrorOr;

namespace Boardgame.Domain.Common.Errors;

public static partial class Errors
{
    public static class EmailSender
    {
        public static Error FailedToSendEmail => Error.Failure(
            code: "Email.FailedToSendEmail",
            description: "Can't to send email try again later.");
    }
}