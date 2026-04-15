using System.Text.Json;
using Api.Data;
using Api.Models;

namespace Api.Seed
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Categories.Any() || context.Products.Any())
                return;

            var json = File.ReadAllText("Seed/seedData.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var data = JsonSerializer.Deserialize<SeedData>(json, options);

            if (data == null)
                return;

            context.Categories.AddRange(data.Categories);
            context.SaveChanges();

            foreach (var product in data.Products)
            {
                var variants = product.Variants.Select(v => new ProductVariant
                {
                    Id = v.Id,
                    Colour = v.Colour,
                    ImageUrl = v.ImageUrl,
                    Sizes = v.Sizes.Select(s => new ProductSize
                    {
                        Id = s.Id,
                        Size = s.Size,
                        Price = s.Price,
                        Stock = s.Stock
                    }).ToList()
                }).ToList();

                var newProduct = new Product
                {
                    Id = product.Id,
                    Name = product.Name,
                    Slug = string.IsNullOrWhiteSpace(product.Slug)
                        ? GenerateSlug(product.Name)
                        : product.Slug,
                    Description = product.Description,
                    Brand = product.Brand,
                    Gender = product.Gender,
                    CategoryId = product.CategoryId,
                    TypeId = product.TypeId,
                    IsNew = product.IsNew,
                    Variants = variants
                };

                context.Products.Add(newProduct);
            }

            context.SaveChanges();
        }

        private static string GenerateSlug(string value)
        {
            return value.Trim().ToLower().Replace(" ", "-");
        }
    }
}