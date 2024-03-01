using Boardgame.Application.Common.interfaces.Authentication.Persistence;
using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class AuthenticationRepository : IAuthentication
{
    private readonly UserManager<UserIdentity> _userManager;

    public AuthenticationRepository(UserManager<UserIdentity> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IdentityResult> ConfirmResetPasswordAsync(UserIdentity user, string token, string newPassword)
    {
        return await _userManager.ResetPasswordAsync(user, token, newPassword);
    }

    public async Task<string> GenerateResetPasswordTokenAsync(UserIdentity user)
    {
        return await _userManager.GeneratePasswordResetTokenAsync(user);
    }
    public async Task<bool> UserValidatePassWordSync(UserIdentity user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }
}
