using Boardgame.Application.Services.Cards.Common;
using ErrorOr;
using MediatR;

namespace Boardgame.Application.Services.Cards.Query;

public record GetAllCardsQuery() : IRequest<ErrorOr<List<CardResult>>>;