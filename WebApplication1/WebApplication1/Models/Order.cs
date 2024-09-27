using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models;

public class Order
{
    [Key]
    public int Id { get; set; }
    
    [Required(ErrorMessage = "Please enter sender's city")]  
    [Column(TypeName = "varchar(100)")]
    public string SenderCity { get; set; }
    
    [Required(ErrorMessage = "Please enter sender's address")]
    [Column(TypeName = "varchar(100)")]
    public string SenderAddress { get; set; }

    [Required(ErrorMessage = "Please enter recipient's city")]
    [Column(TypeName = "varchar(100)")] 
    public string RecipientCity { get; set; }

    [Required(ErrorMessage = "Please enter recipient's address")]
    [Column(TypeName = "varchar(100)")]
    public string RecipientAddress { get; set; }

    [Required(ErrorMessage = "Please enter cargo weight")]
    [Column(TypeName = "decimal(6, 2)")] 
    public decimal Weight { get; set; }
    
    [Required(ErrorMessage = "Please enter cargo pickup date")]
    [Column(TypeName = "date")]
    public DateTime PickupDate { get; set; }
}