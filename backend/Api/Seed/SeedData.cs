using Api.Models;

namespace Api.Seed
{
    public class SeedData
    {
        public List<Category> Categories { get; set; } = new();
        public List<ProductSeed> Products { get; set; } = new();
    }

    public class ProductSeed
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";
        public string Slug { get; set; } = "";
        public string? Description { get; set; }

        public string ThumbnailUrl { get; set; } = "";

        public string Brand { get; set; } = "";
        public string Gender { get; set; } = "";

        public int CategoryId { get; set; }
        public int TypeId { get; set; }

        public bool IsNew { get; set; }

        public List<ProductVariantSeed> Variants { get; set; } = new();
    }

    public class ProductVariantSeed
    {
        public int Id { get; set; }

        public string Colour { get; set; } = "";
        public string ImageUrl { get; set; } = "";

        public List<ProductSizeSeed> Sizes { get; set; } = new();
    }

    public class ProductSizeSeed
    {
        public int Id { get; set; }

        public string Size { get; set; } = "";
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}