namespace Boardgame.Contracts.Services.Branchs.AdminRequest;

public record CreateBranchByAdminRequest(
    string BranchName,
    string Address,
    decimal PlayPricePerHour,
    decimal BuffetPrice);