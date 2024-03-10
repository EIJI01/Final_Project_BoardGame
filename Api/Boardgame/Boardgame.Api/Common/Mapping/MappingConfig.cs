using Boardgame.Application.Authentication.Commands.Login;
using Boardgame.Application.Authentication.Commands.RefreshTokens;
using Boardgame.Application.Authentication.Commands.Register;
using Boardgame.Application.Authentication.Commands.ResetPassword;
using Boardgame.Application.Authentication.Common;
using Boardgame.Application.Authentication.Queries.ForgetPassword;
using Boardgame.Application.Services._Branchs.Command;
using Boardgame.Application.Services._Branchs.Common;
using Boardgame.Application.Services._Branchs.Query;
using Boardgame.Application.Services.Cards.Common;
using Boardgame.Application.Services.Cards.Query;
using Boardgame.Application.Services.Notifications.Command;
using Boardgame.Application.Services.Queues.Command;
using Boardgame.Application.Services.Queues.Common;
using Boardgame.Application.Services.Queues.Query;
using Boardgame.Application.Services.Roles.Command;
using Boardgame.Application.Services.ScanSystems.Command;
using Boardgame.Application.Services.ScanSystems.Common;
using Boardgame.Application.Services.ScanSystems.Query;
using Boardgame.Application.Services.Tables.Common;
using Boardgame.Application.Services.Tables.Query;
using Boardgame.Application.Services.Users.Common;
using Boardgame.Application.Services.Users.Query;
using Boardgame.Application.Services.Works.Command;
using Boardgame.Contracts.Authentication.Requests;
using Boardgame.Contracts.Authentication.Response;
using Boardgame.Contracts.Services.Branchs.AdminRequest;
using Boardgame.Contracts.Services.Branchs.Requests;
using Boardgame.Contracts.Services.Branchs.Response;
using Boardgame.Contracts.Services.Cards.Requests;
using Boardgame.Contracts.Services.Cards.Response;
using Boardgame.Contracts.Services.Notifications.Requests;
using Boardgame.Contracts.Services.Queues.Requests;
using Boardgame.Contracts.Services.Queues.Response;
using Boardgame.Contracts.Services.ScanSystems.Requests;
using Boardgame.Contracts.Services.ScanSystems.Response;
using Boardgame.Contracts.Services.Tables.Requests;
using Boardgame.Contracts.Services.Tables.Response;
using Boardgame.Contracts.Services.Users.Requests;
using Boardgame.Contracts.Services.Users.Response;
using Boardgame.Contracts.Services.Works.Requests;
using Mapster;

namespace Boardgame.Api.Common.Mapping;

public class MappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        // Request
        config.NewConfig<RegisterRequest, RegisterCommand>();
        config.NewConfig<LoginRequest, LoginCommand>();
        config.NewConfig<RefreshTokenRequest, RefreshTokenCommand>();
        config.NewConfig<ForgetPasswordFindEmailRequest, ForgetPasswordFindEmailQuery>();
        config.NewConfig<ForgetPasswordSendEmailRequest, ForgetPasswordSendEmailQuery>();
        config.NewConfig<ResetPasswordRequest, ResetPasswordCommand>();
        config.NewConfig<UserInformationRequest, UserInformationQuery>()
            .Map(dest => dest.Id, dest => dest.Id);
        config.NewConfig<RegisterGmRequest, RegisterGmCommand>();
        config.NewConfig<RegisterAdminRequest, RegisterAdminCommand>();
        config.NewConfig<AddRoleRequest, AddRoleCommand>();
        config.NewConfig<AddWorkRequest, AddWorkCommand>();
        config.NewConfig<GetAllBranchRequest, GetAllBranchQuery>();
        config.NewConfig<GetAllTablesFromBranchIdRequest, GetAllTablesFromBranchIdQuery>();
        config.NewConfig<AddScanSystemRequest, AddScanSystemCommand>();
        config.NewConfig<AddScanSystemByNumberRequest, AddScanSystemByNumberCommand>();
        config.NewConfig<GetTableFromIdRequest, GetTableFromIdQuery>();
        config.NewConfig<GetAllScamSystemRequest, GetAllScanSystemQuery>();
        config.NewConfig<GetScanSystemByTableIdAndTrueRequest, GetScanSystemByTableIdAndTrueQuery>();
        config.NewConfig<CheckoutRequest, CheckoutCommand>();
        config.NewConfig<ChangeTableRequest, ChangeTableCommand>();
        config.NewConfig<DeleteScanSystemRequest, DeleteScanSystemCommand>();
        config.NewConfig<CreateQueueRequest, CreateQueueCommand>();
        config.NewConfig<GetInformationQueueRequest, GetInformationQueueQuery>();
        config.NewConfig<GetAllMemberRequest, GetAllMemberQuery>();
        config.NewConfig<GetScanByCardIdRequestAndTrueRequest, GetScanByCardIdAndTrueQuery>();
        config.NewConfig<GetScanByCardNumberAndTrueRequest, GetScanByCardNumberAndTrueQuery>();
        config.NewConfig<GetAllCardsRequest, GetAllCardsQuery>();
        config.NewConfig<CreateNotificationRequest, CreateNotificationCommand>();
        config.NewConfig<UpdateQueueStatusRequest, UpdateQueueStatusCommand>();
        config.NewConfig<UpdateQueueUserOkRequest, UpdateQueueUserOkCommand>();
        config.NewConfig<UpdateQueueComingSuccessRequest, UpdateQueueComingSuccessCommand>();
        config.NewConfig<UpdateQueueUserCancelRequest, UpdateQueueUserCancelCommand>();
        config.NewConfig<UpdateQueueNotSuccessOkRequest, UpdateQueueNotSuccessOkCommand>();
        config.NewConfig<UpdateScanSystemByScanSystemIdRequest, UpdateScanSystemByScanSystemIdCommand>();
        config.NewConfig<CreateBranchByAdminRequest, CreateBranchByAdminCommand>();

        // Response
        config.NewConfig<AuthenticationResult, AuthenticationResponse>()
            .Map(dest => dest.AccessToken, dest => dest.AccessToken)
            .Map(dest => dest, dest => dest.User)
            .Map(dest => dest.RefreshToken, dest => dest.RefreshToken);
        config.NewConfig<AuthenticationWithRefreshTokenResult, AuthenticationWithRefreshTokenResponse>();
        config.NewConfig<UserResult, UserResponse>()
            .Map(dest => dest, dest => dest.User)
            .Map(dest => dest.Role, dest => dest.Role);
        config.NewConfig<BranchResult, BranchResponse>()
            .Map(dest => dest, dest => dest.Branch);
        config.NewConfig<TableResult, TableResponse>()
            .Map(dest => dest.Type, dest => dest.Table.Type)
            .Map(dest => dest.Status, dest => dest.Table.Status)
            .Map(dest => dest, dest => dest.Table);
        config.NewConfig<ScanSystemResult, ScanSystemResponse>()
            .Map(dest => dest, dest => dest.ScanSystem);
        config.NewConfig<ScanSystemWithCardResult, ScanSystemWithCardResponse>()
            .Map(dest => dest, dest => dest.ScanSystem)
            .Map(dest => dest.Card, dest => dest.Card);
        config.NewConfig<QueueResult, QueueResponse>()
            .Map(dest => dest, dest => dest.Queue);
        config.NewConfig<CardResult, CardResponse>()
            .Map(dest => dest, dest => dest.Card);
    }
}
