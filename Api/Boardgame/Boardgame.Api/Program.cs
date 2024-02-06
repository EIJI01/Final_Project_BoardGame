using Boardgame.Api.Common.Errors;
using Boardgame.Application;
using Boardgame.Infrastructure;
using Microsoft.AspNetCore.Mvc.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddApplication()
        .AddInfrastructure(builder.Configuration);
    builder.Services.AddControllers();
    builder.Services.AddSingleton<ProblemDetailsFactory, BoardgameProblemDetailsFactory>();
    builder.Services.AddCors(o => o.AddPolicy(
        "MyPolicy", builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        }));
}

var app = builder.Build();
{
    app.UseCors("MyPolicy");
    app.UseExceptionHandler("/error");
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}
