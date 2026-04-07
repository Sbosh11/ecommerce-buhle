namespace Api.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";
        public string Brand { get; set; } = "";

        public string Gender { get; set; } = "";

        public int CategoryId { get; set; } // Running
        public int TypeId { get; set; }     // Shoes / Clothing

        public bool IsNew { get; set; }

        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }

        public List<ProductVariantDto> Variants { get; set; } = new();
    }
}