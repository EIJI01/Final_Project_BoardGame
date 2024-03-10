using Boardgame.Api.Controllers;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services._Branchs.Command;
using Boardgame.Contracts.Services.Branchs.AdminRequest;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.AdminControllers;

[Authorize]
[Route("api/[controller]")]
public class BranchAdminController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public BranchAdminController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [Authorize(Roles = RoleKeys.Admin)]
    [HttpPost("admin/create-branch")]
    public async Task<IActionResult> CreateBranch(CreateBranchByAdminRequest request)
    {
        var requestCreate = _mapper.Map<CreateBranchByAdminCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestCreate);

        return result.Match(
            result => Ok(new { message = "Create branch success." }),
            error => Problem(error));
    }
}