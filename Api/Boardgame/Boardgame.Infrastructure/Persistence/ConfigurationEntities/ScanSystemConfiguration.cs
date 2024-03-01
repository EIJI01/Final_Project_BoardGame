using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class ScanSystemConfiguration : IEntityTypeConfiguration<ScanSystem>
{
    public void Configure(EntityTypeBuilder<ScanSystem> builder)
    {
        builder
            .HasKey(s => s.Id);

        builder.Property(s => s.TotalPrice)
            .HasColumnType("decimal(18,2)");

        builder
            .ToTable("ScanSystem");

        builder
            .HasOne(s => s.Table)
            .WithMany(t => t.ScanSystems)
            .HasForeignKey(s => s.TableId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(s => s.Card)
            .WithMany(c => c.ScanSystems)
            .HasForeignKey(s => s.CardId);
    }
}
