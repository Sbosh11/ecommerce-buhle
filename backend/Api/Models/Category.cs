namespace Api.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Slug { get; set; } = "";

        public string Type { get; set; } = "";   // Department, Activity, ProductType
        public int? ParentId { get; set; }

        public int ProductCount { get; set; }
    }
}