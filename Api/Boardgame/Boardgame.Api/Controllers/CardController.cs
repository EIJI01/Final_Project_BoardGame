using Boardgame.Application.Services.Cards.Common;
using Boardgame.Application.Services.Cards.Query;
using Boardgame.Contracts.Services.Cards.Requests;
using Boardgame.Contracts.Services.Cards.Response;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class CardController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public CardController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpGet("get-cards")]
    public async Task<IActionResult> GetAllCard()
    {
        var request = _mapper.Map<GetAllCardsQuery>(new GetAllCardsRequest());

        ErrorOr<List<CardResult>> result = await _mediator.Send(request);

        return result.Match(result => Ok(_mapper.Map<List<CardResponse>>(result)),
        error => Problem(error));
    }
}