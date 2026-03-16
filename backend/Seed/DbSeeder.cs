using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Seed
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            // Ensure database is created
            context.Database.EnsureCreated();

            // Seed categories
            if (!context.Categories.Any())
            {
                var categories = new[]
                {
                    new Category { Name = "Arrival", Slug = "arrival" },
                    new Category { Name = "Women", Slug = "women" },
                    new Category { Name = "Men", Slug = "men" },
                    new Category { Name = "Kids", Slug = "kids" },
                    new Category { Name = "Sports", Slug = "sports" },
                };

                context.Categories.AddRange(categories);
                context.SaveChanges();
            }

            // Seed products if none exist
            if (!context.Products.Any())
            {
                var arrival = context.Categories.First(c => c.Slug == "arrival");
                var women = context.Categories.First(c => c.Slug == "women");
                var men = context.Categories.First(c => c.Slug == "men");

                var products = new List<Product>
                {
                    new Product
                    {
                        Name = "Classic Sneakers",
                        Description = "Comfortable sneakers for everyday wear.",
                        Price = 1200,
                        Brand = "Nike",
                        CategoryId = men.Id,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { Size = "M", Colour = "Black", Stock = 10 },
                            new ProductVariant { Size = "L", Colour = "White", Stock = 5 }
                        },
                        Images = new List<ProductImage>
                        {
                            new ProductImage { Url = "/images/classic-sneakers-1.webp" },
                            new ProductImage { Url = "/images/classic-sneakers-2.webp" }
                        }
                    },
                    new Product
                    {
                        Name = "Sporty T-Shirt",
                        Description = "Lightweight T-shirt for workouts.",
                        Price = 400,
                        Brand = "Adidas",
                        CategoryId = women.Id,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { Size = "S", Colour = "Red", Stock = 15 },
                            new ProductVariant { Size = "M", Colour = "Blue", Stock = 12 }
                        },
                        Images = new List<ProductImage>
                        {
                            new ProductImage { Url = "/images/sporty-tshirt-1.webp" }
                        }
                    },
                    new Product
                    {
                        Name = "Arrival Hoodie",
                        Description = "New arrival hoodie for casual wear.",
                        Price = 800,
                        Brand = "Puma",
                        CategoryId = arrival.Id,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { Size = "M", Colour = "Grey", Stock = 20 },
                            new ProductVariant { Size = "L", Colour = "Black", Stock = 10 }
                        },
                        Images = new List<ProductImage>
                        {
                            new ProductImage { Url = "/images/arrival-hoodie-1.webp" }
                        }
                    }
                };

                context.Products.AddRange(products);
                context.SaveChanges();
            }
        }
    }
}