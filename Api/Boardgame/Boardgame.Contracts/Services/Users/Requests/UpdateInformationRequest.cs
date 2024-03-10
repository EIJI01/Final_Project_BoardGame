using Microsoft.AspNetCore.Http;

namespace Boardgame.Contracts.Services.Users.Requests;

public record UpdateInformationRequest(
    string? Name,
    string? PhoneNumber,
    string? UserId,
    string? ImageName,
    string? ImageSrc,
    IFormFile? ImageFile
);