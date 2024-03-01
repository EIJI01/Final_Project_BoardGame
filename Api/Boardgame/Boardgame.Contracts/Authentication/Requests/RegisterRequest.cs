namespace Boardgame.Contracts.Authentication.Requests;

public record RegisterRequest(
    string Name,
    string Email,
    string PhoneNumber,
    string Password,
    string ConfirmPassword);