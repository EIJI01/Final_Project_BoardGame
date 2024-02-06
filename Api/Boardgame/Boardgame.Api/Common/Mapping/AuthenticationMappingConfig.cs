using Boardgame.Application.Authentication.Commands.Register;
using Boardgame.Application.Authentication.Common;
using Boardgame.Application.Authentication.Queries.Login;
using Boardgame.Contracts.Authentication;
using Mapster;

namespace Boardgame.Api.Common.Mapping;

public class AuthenticationMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<RegisterRequest, RegisterCommand>();

        config.NewConfig<LoginRequest, LoginQuery>();

        config.NewConfig<AuthenticationResult, AuthenticationResponse>()
        .Map(dest => dest.Token, dest => dest.Token)
        .Map(dest => dest, dest => dest.User);
    }
}
