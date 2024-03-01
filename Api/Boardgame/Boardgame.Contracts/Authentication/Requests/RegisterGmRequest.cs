namespace Boardgame.Contracts.Authentication.Requests;

public record RegisterGmRequest(
    string Name,
    string Email,
    string PhoneNumber,
    string Password,
    string ConfirmPassword);