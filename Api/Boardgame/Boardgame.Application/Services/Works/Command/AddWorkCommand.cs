using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Works.Command;

public record AddWorkCommand(
    Guid UserId,
    Guid BranchId) : IRequest<ErrorOr<bool>>;