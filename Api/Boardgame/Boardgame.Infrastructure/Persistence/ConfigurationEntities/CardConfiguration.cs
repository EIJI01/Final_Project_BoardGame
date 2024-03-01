using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class CardConfiguration : IEntityTypeConfiguration<Card>
{
    public void Configure(EntityTypeBuilder<Card> builder)
    {
        builder
            .HasKey(c => c.Id);
        builder
            .ToTable("Card");
        builder
            .HasOne(c => c.Branch)
            .WithMany(b => b.Cards)
            .HasForeignKey(c => c.BranchId);
    }
}
