namespace Api.Dtos
{
    public class ProductSizeDto
    {
        public int Id { get; set; }

        public string Size { get; set; } = "";
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}