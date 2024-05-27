using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IUserRepository
{
    Task<UserIdentity>? GetUserByEmailAsync(string email);
    Task<UserIdentity>? GetUserByUsernameAsync(string username);
    Task<UserIdentity>? GetUserByIdAsync(Guid id);
    Task Add(UserIdentity user);
    Task<IdentityResult> AddUserToRoleAsync(UserIdentity user, string role);
    Task<string> GetUserRoleAsync(UserIdentity user);
    Task<List<UserIdentity>> GetAllUser();
    Task UpdateUserInformation(UserIdentity user);
    Task<List<UserIdentity>> GetUserFromRole(string role);
}