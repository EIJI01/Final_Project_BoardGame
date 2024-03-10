using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Tables.Common;
using Boardgame.Application.Services.Tables.Query;
using Boardgame.Contracts.Services.Tables.Requests;
using Boardgame.Contracts.Services.Tables.Response;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class TableController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public TableController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [Authorize(Roles = RoleKeys.Admin)]
    [HttpPost("add")]
    public async Task<IActionResult> Add()
    {
        await Task.CompletedTask;
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("get-all")]
    public async Task<IActionResult> GetAllTableFromBranch(GetAllTablesFromBranchIdRequest request)
    {
        var requestAllTable = _mapper.Map<GetAllTablesFromBranchIdQuery>(request);

        ErrorOr<List<TableResult>> resultTableList = await _mediator.Send(requestAllTable);

        return resultTableList.Match(
            resultTableList => Ok(_mapper.Map<List<TableResponse>>(resultTableList)),
            error => Problem(error));
    }

    [AllowAnonymous]
    [HttpPost("get-id")]
    public async Task<IActionResult> GetAllTableFromId(GetTableFromIdRequest request)
    {
        var requestTable = _mapper.Map<GetTableFromIdQuery>(request);

        ErrorOr<TableResult> resultTable = await _mediator.Send(requestTable);

        return resultTable.Match(
            resultTable => Ok(_mapper.Map<TableResponse>(resultTable)),
            error => Problem(error));
    }

}