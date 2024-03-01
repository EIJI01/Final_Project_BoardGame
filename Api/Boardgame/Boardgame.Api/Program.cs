using Boardgame.Api;
using Boardgame.Api.Common.Cors;
using Boardgame.Api.Hubs;
using Boardgame.Api.Hubs.MiddlewareExtensions;
using Boardgame.Api.Hubs.SubscribeTableDependencies;
using Boardgame.Application;
using Boardgame.Infrastructure;
using Boardgame.Infrastructure.Persistence.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddPresentation()
        .AddApplication()
        .AddInfrastructure(builder.Configuration);
}

var app = builder.Build();
{
    var connectionString = app.Configuration.GetConnectionString("DefaultConnection");
    app.UseCors(CorsPolicyKeys.MyPolicy);
    app.UseExceptionHandler("/error");
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.MapHub<DatabaseTracking>("/database-tracking");
    app.UseSqlTableDependency<SubscribeScanSystemTableDependency>(connectionString);
    app.UseSqlTableDependency<SubscribeCardTableDependency>(connectionString);
    app.UseSqlTableDependency<SubscribeTablesDependency>(connectionString);
    await SeedDatabase();
    app.Run();
}

async Task SeedDatabase()
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    await dbContext.Database.MigrateAsync();
    await Seed.SeedData(dbContext);
}
