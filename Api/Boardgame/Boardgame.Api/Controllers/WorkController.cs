using System.Security.Claims;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Works.Command;
using Boardgame.Contracts.Services.Works.Requests;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class WorkController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public WorkController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpPost("add/{branchId}")]
    [Authorize(Roles = RoleKeys.Gm)]
    public async Task<IActionResult> AddWork(string branchId)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
        var newRequest = new AddWorkRequest(UserId: Guid.Parse(userId), BranchId: Guid.Parse(branchId));

        var workRequest = _mapper.Map<AddWorkCommand>(newRequest);

        ErrorOr<bool> resultAddWork = await _mediator.Send(workRequest);

        return resultAddWork.Match(
            resultAddWork => Ok(new { message = "You have entered work" }),
            error => Problem(error));
    }

}