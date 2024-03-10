using Boardgame.Api.Hubs.Repository;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace Boardgame.Api.Hubs;

public class DatabaseTracking : Hub
{
    private readonly ScanSystemRepositoryHub scanSystemRepository;
    private readonly CardRepositoryHub cardRepository;
    private readonly TableRepositoryHub tableRepository;
    private readonly QueueRepositoryHub queueRepositoryHub;
    private readonly ILogger<DatabaseTracking> _logger;
    public DatabaseTracking(IConfiguration configuration, ILogger<DatabaseTracking> logger)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        scanSystemRepository = new ScanSystemRepositoryHub(connectionString);
        cardRepository = new CardRepositoryHub(connectionString);
        tableRepository = new TableRepositoryHub(connectionString);
        queueRepositoryHub = new QueueRepositoryHub(connectionString);
        _logger = logger;
    }
    public async Task SendScanSystems()
    {
        try
        {
            var scanSystems = scanSystemRepository.GetScanSystems();
            string jsonString = JsonConvert.SerializeObject(scanSystems);
            await Clients.All.SendAsync("ReceivedScanSystems", jsonString);
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending ScanSystem: {ex.Message}");
        }
    }

    public async Task SendScanSystemsJoinCards()
    {
        try
        {
            var scanSystemsCards = scanSystemRepository.GetScanSystemsJoinCards();
            string jsonString = JsonConvert.SerializeObject(scanSystemsCards);
            await Clients.All.SendAsync("ReceivedScanSystemJoinCards", jsonString);
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending ScanSystemJoinCards: {ex.Message}");
        }
    }

    public async Task SendCards()
    {
        try
        {
            var cards = cardRepository.GetCards();
            string jsonString = JsonConvert.SerializeObject(cards);
            await Clients.All.SendAsync("ReceivedCards", jsonString);

        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending Cards: {ex.Message}");
        }
    }

    public async Task SendTables()
    {
        try
        {
            var tables = tableRepository.GetTables();
            string jsonString = JsonConvert.SerializeObject(tables);
            await Clients.All.SendAsync("ReceivedTables", jsonString);
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending Tables: {ex.Message}");
        }
    }

    public async Task SendQueues()
    {
        try
        {
            var queues = queueRepositoryHub.GetQueues();
            string jsonString = JsonConvert.SerializeObject(queues);
            await Clients.All.SendAsync("ReceivedQueues", jsonString);
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"An error occurred while sending Queues: {ex.Message}");
        }
    }
}