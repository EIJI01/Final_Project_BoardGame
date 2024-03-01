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

    [AllowAnonymous]
    [HttpPost("create-queue")]
    public async Task<IActionResult> CreateQueue()
    {
        await Task.CompletedTask;

        return Ok();
    }
}