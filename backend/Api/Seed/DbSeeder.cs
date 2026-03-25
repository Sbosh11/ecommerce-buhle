using System.Text.Json;
using Api.Data;
using Api.Models;

namespace Api.Seed
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            //context.Database.EnsureCreated();

            if (context.Categories.Any() || context.Products.Any())
                return;

            var json = File.ReadAllText("Seed/seedData.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var data = JsonSerializer.Deserialize<SeedData>(json, options);

            if (data == null) return;

            context.Categories.AddRange(data.Categories);
            context.SaveChanges();

            foreach (var product in data.Products)
            {
                var newProduct = new Product
                {
                    Name = product.Name,
                    Slug = product.Slug,
                    Description = product.Description,
                    Brand = product.Brand,
                    CategoryId = product.CategoryId,

                    Variants = product.Variants.Select(v => new ProductVariant
                    {
                        Size = v.Size,
                        Colour = v.Colour,
                        Price = v.Price,
                        Stock = v.Stock,
                        ImageUrl = v.ImageUrl
                    }).ToList()
                };

                context.Products.Add(newProduct);
            }

            context.SaveChanges();
        }
    }
}