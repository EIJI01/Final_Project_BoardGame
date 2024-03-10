using Microsoft.AspNetCore.Http;

namespace Boardgame.Application.Common.interfaces.Services;

public interface ISaveFileProvider
{
    Task<string> SaveImage(IFormFile imageFile);
}