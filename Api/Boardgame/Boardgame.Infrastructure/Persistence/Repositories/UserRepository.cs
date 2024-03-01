using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserManager<UserIdentity> _userManager;

    public UserRepository(UserManager<UserIdentity> userManager)
    {
        _userManager = userManager;
    }

    public async Task Add(UserIdentity user)
    {
        await _userManager.CreateAsync(user, user.PasswordHash);
    }

    public async Task<IdentityResult> AddUserToRoleAsync(UserIdentity user, string role)
    {
        return await _userManager.AddToRoleAsync(user, role);
    }

    public async Task<UserIdentity>? GetUserByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    public async Task<UserIdentity>? GetUserByIdAsync(Guid id)
    {
        return await _userManager.FindByIdAsync(id.ToString());
    }

    public async Task<UserIdentity>? GetUserByUsernameAsync(string username)
    {
        return await _userManager.FindByNameAsync(username);
    }

    public async Task<string> GetUserRoleAsync(UserIdentity user)
    {
        var result = await _userManager.GetRolesAsync(user);
        return result.FirstOrDefault()!;
    }
}