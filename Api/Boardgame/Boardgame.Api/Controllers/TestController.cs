using System.Net;
using Boardgame.Application.Common.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Api.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : Controller
{
    [HttpGet]
    public ActionResult<List<string>> GetProduct()
    {
        List<string> product = new(){
         "Computer","Notebook","Mouse","Telephone", Dns.GetHostName(),
        };
        return Ok(product);
    }
}