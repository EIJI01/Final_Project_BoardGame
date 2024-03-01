
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Roles.Command;
using Boardgame.Contracts.Authentication.Requests;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class RolesController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public RolesController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpPost("add")]
    [Authorize(Roles = RoleKeys.Admin)]
    public async Task<IActionResult> AddRole(AddRoleRequest request)
    {
        var requestRole = _mapper.Map<AddRoleCommand>(request);

        ErrorOr<bool> resultRole = await _mediator.Send(requestRole);

        return resultRole.Match(
            resultRole => Ok(new { message = "Add role success." }),
            error => Problem(error)
        );
    }
}