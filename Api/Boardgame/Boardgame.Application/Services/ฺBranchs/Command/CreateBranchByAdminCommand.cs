using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services._Branchs.Command;

public record CreateBranchByAdminCommand(
    string BranchName,
    string Address, decimal
    PlayPricePerHour, decimal
    BuffetPrice) : IRequest<ErrorOr<bool>>;