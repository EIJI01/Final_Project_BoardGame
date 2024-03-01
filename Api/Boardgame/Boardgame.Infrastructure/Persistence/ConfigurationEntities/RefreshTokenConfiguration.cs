using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder
            .HasKey(r => r.Id);
        builder
            .ToTable("RefreshToken");
        builder
            .HasOne(u => u.User)
            .WithOne(r => r.Refresh)
            .HasForeignKey<RefreshToken>(r => r.UserId);
    }
}
