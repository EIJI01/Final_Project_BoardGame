
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
            .WithMany(u => u.Queue)
            .HasForeignKey(q => q.UserId);

        builder
            .HasOne(q => q.Branch)
            .WithMany(b => b.Queues)
            .HasForeignKey(q => q.BranchId);
        builder
            .HasOne(q => q.Table)
            .WithMany(t => t.Queue)
            .HasForeignKey(q => q.TableId)
            .OnDelete(DeleteBehavior.Restrict);

    }
}
