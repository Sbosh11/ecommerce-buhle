namespace Api.Dtos
{
    public class ProductVariantDto
    {
        public int Id { get; set; }

        public string Colour { get; set; } = "";
        public string ImageUrl { get; set; } = "";

        public List<ProductSizeDto> Sizes { get; set; } = new();
    }
}