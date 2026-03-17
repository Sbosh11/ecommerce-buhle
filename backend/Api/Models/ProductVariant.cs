using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class ProductVariant
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Size { get; set; } = string.Empty;

        [Required]
        public string Colour { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; } = 0;

        [Required]
        public int Stock { get; set; } = 0;

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}