using Boardgame.Domain.Entities;

namespace Boardgame.Application.Authentication.Common;

public record AuthenticationResult(
    User User,
    string Token);