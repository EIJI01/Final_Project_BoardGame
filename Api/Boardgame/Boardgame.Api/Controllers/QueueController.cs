using System.Security.Claims;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Queues.Command;
using Boardgame.Application.Services.Queues.Common;
using Boardgame.Application.Services.Queues.Query;
using Boardgame.Contracts.Services.Queues.Requests;
using Boardgame.Contracts.Services.Queues.Response;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class QueueController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public QueueController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [Authorize(Roles = RoleKeys.Member)]
    [HttpPost("create-queue")]
    public async Task<IActionResult> CreateQueue(CreateQueueRequest request)
    {
        var requestQueue = _mapper.Map<CreateQueueCommand>(request);

        ErrorOr<QueueResult> queueResponse = await _mediator.Send(requestQueue);

        return queueResponse.Match(
            queueResponse => Ok(_mapper.Map<QueueResponse>(queueResponse)),
            error => Problem(error));
    }


    [Authorize(Roles = RoleKeys.Member)]
    [HttpGet("get-queue")]
    public async Task<IActionResult> GetInformationQueue()
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var request = _mapper.Map<GetInformationQueueQuery>(new GetInformationQueueRequest(userId));

        ErrorOr<QueueResult> resultQueue = await _mediator.Send(request);

        return resultQueue.Match(
            resultQueue => Ok(_mapper.Map<QueueResponse>(resultQueue)),
            error => Problem(error));
    }


    [Authorize(Roles = $"{RoleKeys.Gm}")]
    [HttpPatch("update-queue")]
    public async Task<IActionResult> UpdateQueue(UpdateQueueStatusRequest request)
    {
        var requestQueue = _mapper.Map<UpdateQueueStatusCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestQueue);

        return result.Match(
            result => Ok(new { message = "Update queue success." }),
            error => Problem(error));
    }


    [Authorize(Roles = $"{RoleKeys.Member}")]
    [HttpPatch("update-queueUserCancel")]
    public async Task<IActionResult> UpdateQueueUserCancel(UpdateQueueUserCancelRequest request)
    {

        var requestQueue = _mapper.Map<UpdateQueueUserCancelCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestQueue);

        return result.Match(
            result => Ok(new { message = "Update queue success." }),
            error => Problem(error));
    }


    [Authorize(Roles = $"{RoleKeys.Member}")]
    [HttpPatch("update-queueUserOk")]
    public async Task<IActionResult> UpdateQueueUserOk(UpdateQueueUserOkRequest request)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
        request = request with { UserId = userId };
        var requestQueue = _mapper.Map<UpdateQueueUserOkCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestQueue);

        return result.Match(
            result => Ok(new { message = "Update queue success." }),
            error => Problem(error));
    }


    [Authorize(Roles = $"{RoleKeys.Gm}")]
    [HttpPatch("update-queueComingSuccess")]
    public async Task<IActionResult> UpdateQueueComingSuccess(UpdateQueueComingSuccessRequest request)
    {
        var requestQueue = _mapper.Map<UpdateQueueComingSuccessCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestQueue);

        return result.Match(
            result => Ok(new { message = "Update queue success." }),
            error => Problem(error));
    }


    [Authorize(Roles = $"{RoleKeys.Member}")]
    [HttpPatch("update-queueCancelQueue")]
    public async Task<IActionResult> UpdateQueueCancelQueue()
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var request = new UpdateQueueCancelQueueRequest(UserId: userId);

        var requestQueue = _mapper.Map<UpdateQueueCancelQueueCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestQueue);

        return result.Match(
            result => Ok(new { message = "Update queue success." }),
            error => Problem(error));
    }


    [Authorize(Roles = $"{RoleKeys.Member}")]
    [HttpPatch("update-queueNotSuccessOk")]
    public async Task<IActionResult> UpdateQueueNotSuccessOk()
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var request = new UpdateQueueNotSuccessOkRequest(UserId: userId);

        var requestQueue = _mapper.Map<UpdateQueueNotSuccessOkCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestQueue);

        return result.Match(
            result => Ok(new { message = "Update notification success." }),
            error => Problem(error));
    }


}