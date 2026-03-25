using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }

        public string Size { get; set; } = string.Empty;
        public string Colour { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public int Stock { get; set; }

        public string ImageUrl { get; set; } = "";

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}