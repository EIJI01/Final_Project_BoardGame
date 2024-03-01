using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Boardgame.Infrastructure.Persistence.Repositories;

public class RoleRepository : IRoleRepository
{
    private readonly RoleManager<RoleIdentity> _roleManager;

    public RoleRepository(RoleManager<RoleIdentity> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task<IdentityResult> AddRoleAsync(RoleIdentity role)
    {
        return await _roleManager.CreateAsync(role);
    }

    public async Task<RoleIdentity> GetRoleByNameAsync(string name)
    {
        return await _roleManager.FindByNameAsync(name.ToUpper());
    }

    public async Task<bool> RoleExistAsync(string role)
    {
        return await _roleManager.RoleExistsAsync(role.ToUpper());
    }
}
