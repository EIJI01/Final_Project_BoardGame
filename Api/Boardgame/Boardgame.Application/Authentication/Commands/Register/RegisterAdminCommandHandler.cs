using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public class RegisterAdminCommandHandler : IRequestHandler<RegisterAdminCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;

    public RegisterAdminCommandHandler(IRoleRepository roleRepository, IUserRepository userRepository)
    {
        _roleRepository = roleRepository;
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<bool>> Handle(RegisterAdminCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepository.GetUserByUsernameAsync(request.Username)! is not null)
        {
            return Error.Conflict(code: "User.DuplicateUsername", description: "Username has already exist.");
        }

        if (await _roleRepository.GetRoleByNameAsync(RoleKeys.Admin) is null)
        {
            return Errors.Role.NotFound;
        }

        var user = new UserIdentity
        {
            Name = request.Name,
            Email = request.Username,
            UserName = request.Username,
            PasswordHash = request.Password,
        };

        await _userRepository.Add(user);

        var resultRole = await _userRepository.AddUserToRoleAsync(user, RoleKeys.Admin);

        if (!resultRole.Succeeded)
        {
            return Error.Failure(code: "User.FailToAddRole", description: "Can't add role to user.");
        }

        return true;
    }
}
