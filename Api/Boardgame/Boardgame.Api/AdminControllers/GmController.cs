using Boardgame.Api.Controllers;
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

namespace Boardgame.Api.AdminControllers;

[Authorize(Roles = RoleKeys.Admin)]
[Route("api/[controller]")]
public class GmController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public GmController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllGm()
    {
        var request = _mapper.Map<GetAllGmQuery>(new GetAllGmRequest());

        ErrorOr<List<UserResult>> result = await _mediator.Send(request);

        return result.Match(
            result => Ok(_mapper.Map<List<UserResponse>>(result)),
            error => Problem(error));
    }
}