using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Synvora.Models;

namespace Synvora.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Products()
    {
        return View();
    }

    public IActionResult About()
    {
        return View();
    }

    public IActionResult Contact()
    {
        return View(new ContactViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Contact(ContactViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        // Mock saving message or sending email
        TempData["SuccessMessage"] = $"Thank you, {model.Name}! Your message regarding '{model.ProductInterest}' has been sent successfully. Our enterprise solutions team will contact you shortly.";
        return RedirectToAction(nameof(Contact));
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
