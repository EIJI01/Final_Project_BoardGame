using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class ConnectionHubConfiguration : IEntityTypeConfiguration<ConnectionHub>
{
    public void Configure(EntityTypeBuilder<ConnectionHub> builder)
    {
        builder
            .HasKey(c => c.Id);

        builder
            .ToTable("ConnectionHub");

        builder
            .HasOne(u => u.User)
            .WithMany(c => c.ConnectionHubs)
            .HasForeignKey(c => c.UserId);
    }
}
