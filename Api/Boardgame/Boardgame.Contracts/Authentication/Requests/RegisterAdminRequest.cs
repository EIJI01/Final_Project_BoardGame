namespace Boardgame.Contracts.Authentication.Requests;

public record RegisterAdminRequest(
    string Name,
    string Username,
    string Password);