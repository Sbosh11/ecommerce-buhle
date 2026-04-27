namespace Api.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";
        public string Slug { get; set; } = "";
        public string? Description { get; set; }

        public string ThumbnailUrl { get; set; } = "";

        public decimal Price { get; set; } // lowest price across all sizes
        public string Brand { get; set; } = "";
        public string Gender { get; set; } = "";

        public int CategoryId { get; set; }
        public int TypeId { get; set; }

        public bool IsNew { get; set; }

        public List<ProductVariantDto> Variants { get; set; } = new();
    }
}