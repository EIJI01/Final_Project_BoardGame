using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class WorkConfiguration : IEntityTypeConfiguration<Work>
{
    public void Configure(EntityTypeBuilder<Work> builder)
    {
        builder
            .HasKey(w => w.Id);
        builder
            .ToTable("Work");
        builder
            .HasOne(w => w.Branch)
            .WithMany(b => b.Works)
            .HasForeignKey(w => w.BranchId);

        builder
            .HasOne(w => w.User)
            .WithMany(u => u.Works)
            .HasForeignKey(w => w.UserId);
    }
}
