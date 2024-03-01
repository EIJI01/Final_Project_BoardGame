using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Roles.Command;

public class AddRoleCommandHandler : IRequestHandler<AddRoleCommand, ErrorOr<bool>>
{
    private readonly IRoleRepository _roleRepository;

    public AddRoleCommandHandler(IRoleRepository roleRepository)
    {
        _roleRepository = roleRepository;
    }

    public async Task<ErrorOr<bool>> Handle(AddRoleCommand request, CancellationToken cancellationToken)
    {
        if (await _roleRepository.GetRoleByNameAsync(request.Role) is RoleIdentity role)
        {
            return Errors.Role.DuplicateRole;
        }
        var newRole = new RoleIdentity
        {
            Name = request.Role.ToUpper()
        };

        var result = await _roleRepository.AddRoleAsync(newRole);

        if (!result.Succeeded)
        {
            return Error.Failure(
                code: "Role.AddFailed.",
                description: "Fail to add role.");
        }
        await Task.CompletedTask;

        return true;
    }
}
