using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Services.Notifications.Command;
using Boardgame.Contracts.Services.Notifications.Requests;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class NotificationController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public NotificationController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPost("send-notificationSuccess")]
    public async Task<IActionResult> SendNotificationInQueue(CreateNotificationRequest request)
    {
        var requestCreate = _mapper.Map<CreateNotificationCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestCreate);

        return result.Match(result => Ok(new { message = "Create Success" }),
            error => Problem(error));
    }

    [Authorize(Roles = RoleKeys.Gm)]
    [HttpPost("send-notificationNotSuccess")]
    public async Task<IActionResult> SendNotificationNotSuccess(CreateNotificationNotSuccessRequest request)
    {
        var requestCreate = _mapper.Map<CreateNotificationNotSuccessCommand>(request);

        ErrorOr<bool> result = await _mediator.Send(requestCreate);

        return result.Match(result => Ok(new { message = "Create Success" }),
            error => Problem(error));
    }
}