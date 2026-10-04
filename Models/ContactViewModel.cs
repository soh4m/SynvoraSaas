using System.ComponentModel.DataAnnotations;

namespace Synvora.Models;

public class ContactViewModel
{
    [Required(ErrorMessage = "Please enter your name")]
    [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
    [Display(Name = "Full Name")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter your email address")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [Display(Name = "Email Address")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please specify a subject")]
    [StringLength(150, ErrorMessage = "Subject cannot exceed 150 characters")]
    public string Subject { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please select a product or area of interest")]
    [Display(Name = "Product Interest")]
    public string ProductInterest { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter your message")]
    [StringLength(2000, ErrorMessage = "Message cannot exceed 2000 characters")]
    [Display(Name = "Message")]
    public string Message { get; set; } = string.Empty;
}
