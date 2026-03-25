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
        public string Name { get; set; } = "";
        public string Slug { get; set; } = "";
        public string? Description { get; set; }
        public string Brand { get; set; } = "";
        public int CategoryId { get; set; }

        public List<ProductVariant> Variants { get; set; } = new();
    }
}