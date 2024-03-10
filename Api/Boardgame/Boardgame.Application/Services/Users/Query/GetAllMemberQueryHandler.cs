using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Users.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Users.Query;

public class GetAllMemberQueryHandler : IRequestHandler<GetAllMemberQuery, ErrorOr<List<UserResult>>>
{
    private readonly IUserRepository _userRepository;

    public GetAllMemberQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<List<UserResult>>> Handle(GetAllMemberQuery request, CancellationToken cancellationToken)
    {
        var resultList = await _userRepository.GetAllUser();

        var userRoleList = resultList.Select(
            result => _userRepository.GetUserRoleAsync(result).Result == RoleKeys.Member ?
            new UserResult(User: result, Role: _userRepository.GetUserRoleAsync(result).Result) : null
        ).ToList();

        var resultUser = userRoleList.Where(result => result != null);

        return resultUser.ToList()!;
    }
}
