namespace Api.Dtos
{
    public class ProductVariantDto
    {
        public int Id { get; set; }
        public string Size { get; set; } = "";
        public string Colour { get; set; } = "";
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}