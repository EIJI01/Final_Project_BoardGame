using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Application.Authentication.Common;

public record AuthenticationResult(
    UserIdentity User,
    string AccessToken,
    string RefreshToken);