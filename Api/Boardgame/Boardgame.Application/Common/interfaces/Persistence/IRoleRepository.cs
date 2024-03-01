

using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Application.Common.interfaces.Persistence;

public interface IRoleRepository
{
    Task<RoleIdentity> GetRoleByNameAsync(string name);
    Task<IdentityResult> AddRoleAsync(RoleIdentity role);
    Task<bool> RoleExistAsync(string role);
}