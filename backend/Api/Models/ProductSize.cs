namespace Api.Models
{
    public class ProductSize
    {
        public int Id { get; set; }

        public string Size { get; set; } = "";
        public decimal Price { get; set; }
        public int Stock { get; set; }

        public int ProductVariantId { get; set; }
        public ProductVariant? ProductVariant { get; set; }
    }
}