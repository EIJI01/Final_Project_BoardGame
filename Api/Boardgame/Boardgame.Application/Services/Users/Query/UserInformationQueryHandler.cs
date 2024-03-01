using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Users.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Users.Query;

public class UserInformationQueryHandler : IRequestHandler<UserInformationQuery, ErrorOr<UserResult>>
{
    private readonly IUserRepository _userRepository;

    public UserInformationQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<UserResult>> Handle(UserInformationQuery request, CancellationToken cancellationToken)
    {
        if (request.Id is null)
        {
            return Errors.User.UserNotFound;
        }

        if (!Guid.TryParse(request.Id, out Guid outputGuid))
        {
            return Error.Conflict(code: "Id.NotValid", description: "Id is not Guid.");
        }

        if (await _userRepository.GetUserByIdAsync(outputGuid)! is not UserIdentity user)
        {
            return Errors.User.UserNotFound;
        }
        var role = await _userRepository.GetUserRoleAsync(user);

        return new UserResult(
            user,
            role);
    }
}
