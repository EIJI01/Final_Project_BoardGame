using Boardgame.Api.Hubs.Repository;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace Boardgame.Api.Hubs;

public class DatabaseTracking : Hub
{
    private readonly ScanSystemRepositoryHub scanSystemRepository;
    private readonly CardRepositoryHub cardRepository;
    private readonly TableRepositoryHub tableRepository;
    public DatabaseTracking(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        scanSystemRepository = new ScanSystemRepositoryHub(connectionString);
        cardRepository = new CardRepositoryHub(connectionString);
        tableRepository = new TableRepositoryHub(connectionString);
    }
    public async Task SendScanSystems()
    {
        var scanSystems = scanSystemRepository.GetScanSystems();
        string jsonString = JsonConvert.SerializeObject(scanSystems);

        await Clients.All.SendAsync("ReceivedScanSystems", jsonString);
    }

    public async Task SendCards()
    {
        var cards = cardRepository.GetCards();
        string jsonString = JsonConvert.SerializeObject(cards);
        await Clients.All.SendAsync("ReceivedCards", jsonString);
    }

    public async Task SendTables()
    {
        var tables = tableRepository.GetTables();
        string jsonString = JsonConvert.SerializeObject(tables);
        await Clients.All.SendAsync("ReceivedTables", jsonString);
    }
}