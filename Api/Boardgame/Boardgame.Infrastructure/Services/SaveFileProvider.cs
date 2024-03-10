using Boardgame.Application.Common.interfaces.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Boardgame.Infrastructure.Services;

public class SaveFileProvider : ISaveFileProvider
{
    private readonly IWebHostEnvironment _hostEnvironment;

    public SaveFileProvider(IWebHostEnvironment webHostEnvironment)
    {
        _hostEnvironment = webHostEnvironment;
    }

    public async Task<string> SaveImage(IFormFile imageFile)
    {
        string imageName = new string(Path
            .GetFileNameWithoutExtension(imageFile.FileName)
            .Take(10).ToArray())
            .Replace(' ', '-');

        imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);

        var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

        using var fileStream = new FileStream(imagePath, FileMode.Create);

        await imageFile.CopyToAsync(fileStream);

        return imageName;
    }
}
