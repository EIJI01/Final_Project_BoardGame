using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Users.Common;
using Boardgame.Application.Services.Users.Query;
using Boardgame.Contracts.Services.Users.Requests;
using Boardgame.Contracts.Services.Users.Response;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class UserController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public UserController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(Roles = $"{RoleKeys.Member},{RoleKeys.Gm},{RoleKeys.Admin}")]
    public async Task<IActionResult> GetUserInformation()
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
        var request = new UserInformationRequest(Id: userId);

        var requestUser = _mapper.Map<UserInformationQuery>(request);

        ErrorOr<UserResult> userResult = await _mediator.Send(requestUser);

        return userResult.Match(
            userResult => Ok(_mapper.Map<UserResponse>(userResult)),
            error => Problem(error)
        );
    }
}