
using Boardgame.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boardgame.Infrastructure.Persistence.ConfigurationEntities;

public class QueueConfiguration : IEntityTypeConfiguration<Queue>
{
    public void Configure(EntityTypeBuilder<Queue> builder)
    {
        builder
            .HasKey(q => q.Id);

        builder
            .ToTable("Queue");

        builder
            .HasOne(q => q.User)
            .WithOne(u => u.Queue)
            .HasForeignKey<Queue>(q => q.UserId);
        builder
            .HasOne(q => q.Branch)
            .WithMany(b => b.Queues)
            .HasForeignKey(q => q.BranchId);
        builder
            .HasOne(q => q.Table)
            .WithOne(t => t.Queue)
            .HasForeignKey<Queue>(q => q.TableId)
            .OnDelete(DeleteBehavior.Restrict);

    }
}
