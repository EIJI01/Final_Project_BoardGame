using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Application.Common.interfaces.Authentication.Persistence;

public interface IAuthentication
{
    Task<bool> UserValidatePassWordSync(UserIdentity user, string password);
    Task<string> GenerateResetPasswordTokenAsync(UserIdentity user);
    Task<IdentityResult> ConfirmResetPasswordAsync(UserIdentity user, string token, string newPassword);
}