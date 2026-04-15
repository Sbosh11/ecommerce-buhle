namespace Api.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }

        public string Colour { get; set; } = "";
        public string ImageUrl { get; set; } = "";

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public ICollection<ProductSize> Sizes { get; set; } = new List<ProductSize>();
    }
}