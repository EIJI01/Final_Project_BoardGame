using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Services.Users.Common;
using Boardgame.Domain.Common.Errors;
using Boardgame.Domain.Entities;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Authentication.Queries.ForgetPassword;

public class ForgetPasswordFindEmailQueryHandler : IRequestHandler<ForgetPasswordFindEmailQuery, ErrorOr<UserResult>>
{
    private readonly IUserRepository _userRepository;

    public ForgetPasswordFindEmailQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<UserResult>> Handle(ForgetPasswordFindEmailQuery request, CancellationToken cancellationToken)
    {
        if (await _userRepository.GetUserByEmailAsync(request.Email)! is not UserIdentity user)
        {
            return Errors.User.NotFoundEmail;
        }
        return new UserResult(
            user
        );
    }
}
