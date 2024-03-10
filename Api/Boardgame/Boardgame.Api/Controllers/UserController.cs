using System.Security.Claims;
using Boardgame.Application.Common.Authentication;
using Boardgame.Application.Common.interfaces.Persistence;
using Boardgame.Application.Common.interfaces.Services;
using Boardgame.Application.Services.Users.Common;
using Boardgame.Application.Services.Users.Query;
using Boardgame.Contracts.Services.Users.Requests;
using Boardgame.Contracts.Services.Users.Response;
using Boardgame.Domain.Entities;
using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Boardgame.Domain.Common.Errors;

namespace Boardgame.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public class UserController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;
    private readonly ISaveFileProvider _saveFileProvider;
    private readonly ILogger<UserController> _logger;

    public UserController(IMapper mapper, IMediator mediator, ISaveFileProvider saveFileProvider, IUserRepository userRepository, ILogger<UserController> logger)
    {
        _mapper = mapper;
        _mediator = mediator;
        _saveFileProvider = saveFileProvider;
        _userRepository = userRepository;
        _logger = logger;
    }

    [HttpGet]
    [Authorize(Roles = $"{RoleKeys.Member},{RoleKeys.Gm},{RoleKeys.Admin}")]
    public async Task<IActionResult> GetUserInformation()
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
        var request = new UserInformationRequest(Id: userId);

        var requestUser = _mapper.Map<UserInformationQuery>(request);

        ErrorOr<UserResult> userResult = await _mediator.Send(requestUser);

        return userResult.Match(
            userResult => Ok(_mapper.Map<UserResponse>(userResult)),
            error => Problem(error)
        );
    }

    [Authorize(Roles = RoleKeys.Gm)]
    [HttpGet("get-member")]
    public async Task<IActionResult> GetAllMember()
    {
        var request = _mapper.Map<GetAllMemberQuery>(new GetAllMemberRequest());

        ErrorOr<List<UserResult>> result = await _mediator.Send(request);

        return result.Match(
            result => Ok(_mapper.Map<List<UserResponse>>(result)),
            error => Problem(error));
    }

    [Authorize(Roles = RoleKeys.Member)]
    [HttpPatch("update-information")]
    public async Task<IActionResult> UpdateInformation([FromForm] UpdateInformationRequest request)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Problem(title: "kuy", statusCode: StatusCodes.Status400BadRequest);
        }
        request = request with { UserId = userId };

        if (!Guid.TryParse(request.UserId, out Guid guidUser))
        {
            return Problem(title: "User not found", statusCode: StatusCodes.Status404NotFound);
        }

        if (await _userRepository.GetUserByIdAsync(guidUser)! is not UserIdentity user)
        {
            return Problem(title: "User not found", statusCode: StatusCodes.Status404NotFound);
        }

        if (request.ImageFile is not null)
        {
            var name = await _saveFileProvider.SaveImage(request.ImageFile);
            user.Image = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/{name}";
        }

        if (!string.IsNullOrEmpty(user.Name))
        {
            user.Name = request.Name!;
        }

        if (!string.IsNullOrEmpty(request.PhoneNumber))
        {
            user.PhoneNumber = request.PhoneNumber;
        }

        try
        {
            await _userRepository.UpdateUserInformation(user);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Can not update user information in : {nameof(UserIdentity)} {ex.Message}");
        }

        return Ok(new { message = "Update information success" });
    }
}