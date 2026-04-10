namespace Api.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";
        public string Slug { get; set; } = "";
        public string? Description { get; set; }
        public string Brand { get; set; } = "";
        public string Gender { get; set; } = "";

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public int TypeId { get; set; }
        public Category? Type { get; set; }

        public bool IsNew { get; set; }

        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    }
}