using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.ScanSystems.Command;
using Boardgame.Application.Services.ScanSystems.Common;
using Boardgame.Application.Services.ScanSystems.Query;
using Boardgame.Contracts.Services.ScanSystems.Requests;
using Boardgame.Contracts.Services.ScanSystems.Response;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class ScanSystemController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public ScanSystemController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;

    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPost("add")]
    public async Task<IActionResult> AddScanSystem(AddScanSystemRequest request)
    {
        var requestScanSystem = _mapper.Map<AddScanSystemCommand>(request);

        ErrorOr<bool> resultScanSystem = await _mediator.Send(requestScanSystem);

        return resultScanSystem.Match(
            resultScanSystem => Ok(new { message = "Add card to scan system success." }),
            error => Problem(error));
    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPost("add-number")]
    public async Task<IActionResult> AddScanSystemByName(AddScanSystemByNumberRequest request)
    {
        var requestScanSystem = _mapper.Map<AddScanSystemByNumberCommand>(request);

        ErrorOr<bool> resultScanSystemByNumber = await _mediator.Send(requestScanSystem);

        return resultScanSystemByNumber.Match(
            resultScanSystemByNumber => Ok(new { message = "Add card to scan system success." }),
            error => Problem(error));
    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpGet("get-all")]
    public async Task<IActionResult> GetScanSystem()
    {
        var requestScanSystem = _mapper.Map<GetAllScanSystemQuery>(new GetAllScamSystemRequest());

        ErrorOr<List<ScanSystemResult>> resultScanSystem = await _mediator.Send(requestScanSystem);

        return resultScanSystem.Match(
            resultScanSystem => Ok(_mapper.Map<List<ScanSystemResponse>>(resultScanSystem)),
            error => Problem(error));
    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPost("get-tableId")]
    public async Task<IActionResult> GetScanSystemByTableId(GetScanSystemByTableIdAndTrueRequest request)
    {
        var requestScanSystemByTableId = _mapper.Map<GetScanSystemByTableIdAndTrueQuery>(request);

        ErrorOr<List<ScanSystemWithCardResult>> resultScanSystemByTableId = await _mediator.Send(requestScanSystemByTableId);

        return resultScanSystemByTableId.Match(
            resultScanSystemByTableId => Ok(_mapper.Map<List<ScanSystemWithCardResponse>>(resultScanSystemByTableId)),
            error => Problem(error));
    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPatch("checkout")]
    public async Task<IActionResult> CheckoutScanSystem(CheckoutRequest request)
    {
        var requestMapper = _mapper.Map<CheckoutCommand>(request);

        ErrorOr<bool> resultUpdate = await _mediator.Send(requestMapper);

        return resultUpdate.Match(
            resultUpdate => Ok(new { message = "Checkout success." }),
            error => Problem(error)
        );
    }

    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPatch("change-table")]
    public async Task<IActionResult> ChangeTableScanSystem(ChangeTableRequest request)
    {
        var requestMapper = _mapper.Map<ChangeTableCommand>(request);

        ErrorOr<bool> resultUpdate = await _mediator.Send(requestMapper);

        return resultUpdate.Match(
            resultUpdate => Ok(new { message = "Change table success." }),
            error => Problem(error)
        );
    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpDelete("delete-scanSystem")]
    public async Task<IActionResult> DeleteScanSystem(DeleteScanSystemRequest request)
    {
        var requestMapper = _mapper.Map<DeleteScanSystemCommand>(request);

        ErrorOr<bool> resultUpdate = await _mediator.Send(requestMapper);

        return resultUpdate.Match(
            resultUpdate => Ok(new { message = "Delete ScanSystem success." }),
            error => Problem(error)
        );
    }

    [AllowAnonymous]
    [HttpPost("get-scanByCard")]
    public async Task<IActionResult> GetScanByCardId(GetScanByCardIdRequestAndTrueRequest request)
    {
        var requestCard = _mapper.Map<GetScanByCardIdAndTrueQuery>(request);

        ErrorOr<ScanSystemResult> resultScan = await _mediator.Send(requestCard);

        return resultScan.Match(
            resultScan => Ok(_mapper.Map<ScanSystemResponse>(resultScan)),
            error => Problem(error));
    }

    [AllowAnonymous]
    [HttpPost("get-scanByCardNumber")]
    public async Task<IActionResult> GetScanByCardNumber(GetScanByCardNumberAndTrueRequest request)
    {
        var requestCardNumber = _mapper.Map<GetScanByCardNumberAndTrueQuery>(request);

        ErrorOr<ScanSystemResult> resultScan = await _mediator.Send(requestCardNumber);

        return resultScan.Match(
            resultScan => Ok(_mapper.Map<ScanSystemResponse>(resultScan)),
            error => Problem(error));
    }


    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPatch("update-information-scanSystem")]
    public async Task<IActionResult> UpdateScanSystemByScanSystemId(UpdateScanSystemByScanSystemIdRequest request)
    {
        var requestScanSystem = _mapper.Map<UpdateScanSystemByScanSystemIdCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestScanSystem);

        return result.Match(
            result => Ok(new { message = "Update scanSystem success." }),
            error => Problem(error));
    }

}