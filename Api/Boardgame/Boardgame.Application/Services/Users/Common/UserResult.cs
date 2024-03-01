using Boardgame.Domain.Entities;

namespace Boardgame.Application.Services.Users.Common;

public record UserResult(
    UserIdentity User,
    string? Role = null);