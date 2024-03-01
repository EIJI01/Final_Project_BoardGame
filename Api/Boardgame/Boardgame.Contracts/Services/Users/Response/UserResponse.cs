namespace Boardgame.Contracts.Services.Users.Response;

public record UserResponse(
    Guid Id,
    string UserName,
    string Name,
    string Email,
    string? Role,
    string? Image,
    string? PhoneNumber,
    string? Salary);