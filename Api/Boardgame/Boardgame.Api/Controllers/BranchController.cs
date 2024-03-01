using Boardgame.Application.Services._Branchs.Common;
using Boardgame.Application.Services._Branchs.Query;
using Boardgame.Contracts.Services.Branchs.Requests;
using Boardgame.Contracts.Services.Branchs.Response;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class BranchController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public BranchController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [AllowAnonymous]
    [HttpGet("get-all")]
    public async Task<IActionResult> GetBranch()
    {
        var request = _mapper.Map<GetAllBranchQuery>(new GetAllBranchRequest());

        ErrorOr<List<BranchResult>> resultBranchAll = await _mediator.Send(request);

        return resultBranchAll.Match(
            resultBranchAll => Ok(_mapper.Map<List<BranchResponse>>(resultBranchAll)),
            error => Problem(error));
    }
}