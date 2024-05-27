using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Users.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Users.Query;

public class GetAllGmQueryHandler : IRequestHandler<GetAllGmQuery, ErrorOr<List<UserResult>>>
{
    private readonly IUserRepository _userRepository;

    public GetAllGmQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<List<UserResult>>> Handle(GetAllGmQuery request, CancellationToken cancellationToken)
    {
        var result = await _userRepository.GetUserFromRole(RoleKeys.Gm);

        var gm = result.Select(data => new UserResult(data));

        return gm.ToList();
    }
}
