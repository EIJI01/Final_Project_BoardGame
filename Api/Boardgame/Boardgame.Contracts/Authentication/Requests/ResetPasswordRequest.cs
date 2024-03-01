namespace Boardgame.Contracts.Authentication.Requests;

public record ResetPasswordRequest(
    string Email,
    string Token,
    string Password,
    string ConfirmPassword);