using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Commands.Register;

public class RegisterGmCommandHandler : IRequestHandler<RegisterGmCommand, ErrorOr<bool>>
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;

    public RegisterGmCommandHandler(IUserRepository userRepository, IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
    }

    public async Task<ErrorOr<bool>> Handle(RegisterGmCommand request, CancellationToken cancellationToken)
    {
        if (!request.Password.Equals(request.ConfirmPassword))
        {
            return Error.Conflict(code: "Password.Conflict", description: "Password is not match confirm password.");
        }

        if (await _userRepository.GetUserByEmailAsync(request.Email)! is not null)
        {
            return Errors.User.DuplicateEmail;
        }

        if (!await _roleRepository.RoleExistAsync(RoleKeys.Gm))
        {
            return Errors.Role.NotFound;
        }

        var user = new UserIdentity
        {
            Name = request.Name,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
            UserName = request.Email,
            PasswordHash = request.Password,
        };

        try
        {
            await _userRepository.Add(user);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        if (await _userRepository.GetUserByEmailAsync(user.Email)! is null)
        {
            return Error.Failure(code: "Kuy");
        }

        var resultRole = await _userRepository.AddUserToRoleAsync(user, RoleKeys.Gm);

        if (!resultRole.Succeeded)
        {
            return Error.Failure(code: "User.FailToAddRole", description: "Can't add role to user.");
        }

        return true;
    }
}
