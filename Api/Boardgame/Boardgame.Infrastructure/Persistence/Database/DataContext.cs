using Boardgame.Domain.Entities;
using Boardgame.Infrastructure.Persistence.ConfigurationEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Boardgame.Infrastructure.Persistence.Database;

public class DataContext : IdentityDbContext<UserIdentity, RoleIdentity, Guid>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<TablePlay>? Tables { get; set; }
    public DbSet<Branch>? Branches { get; set; }
    public DbSet<RefreshToken>? RefreshTokens { get; set; }
    public DbSet<Card>? Cards { get; set; }
    public DbSet<Work>? Works { get; set; }
    public DbSet<Event>? Events { get; set; }
    public DbSet<Queue>? Queues { get; set; }
    public DbSet<ScanSystem>? ScanSystems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new BranchConfiguration());
        modelBuilder.ApplyConfiguration(new TableConfiguration());
        modelBuilder.ApplyConfiguration(new RefreshTokenConfiguration());
        modelBuilder.ApplyConfiguration(new CardConfiguration());
        modelBuilder.ApplyConfiguration(new QueueConfiguration());
        modelBuilder.ApplyConfiguration(new ScanSystemConfiguration());
        modelBuilder.ApplyConfiguration(new WorkConfiguration());
        modelBuilder.ApplyConfiguration(new EventConfiguration());
        modelBuilder.ApplyConfiguration(new UserIdentityConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}
