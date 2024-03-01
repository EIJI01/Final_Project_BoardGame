using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder
            .HasKey(b => b.Id);

        builder.Property(b => b.PlayPricePerHour)
            .HasColumnType("decimal(18,2)");

        builder.Property(b => b.BuffetPrice)
            .HasColumnType("decimal(18,2)");

        builder
            .ToTable("Branch");

    }
}
