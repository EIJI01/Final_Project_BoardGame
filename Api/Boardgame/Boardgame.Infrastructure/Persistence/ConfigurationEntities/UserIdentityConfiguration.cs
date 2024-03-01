using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class UserIdentityConfiguration : IEntityTypeConfiguration<UserIdentity>
{
    public void Configure(EntityTypeBuilder<UserIdentity> builder)
    {
        builder.Property(u => u.Salary)
            .HasColumnType("decimal(18,2)");
    }
}
