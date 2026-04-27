using Api.Data;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts(
            string? gender,
            int? categoryId,
            int? typeId)
        {
            var query = _context.Products
                .Include(p => p.Variants)
                .ThenInclude(v => v.Sizes)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(gender))
                query = query.Where(p => p.Gender == gender);

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            if (typeId.HasValue)
                query = query.Where(p => p.TypeId == typeId.Value);

            var products = await query
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Description = p.Description,
                    ThumbnailUrl = p.ThumbnailUrl,
                    Brand = p.Brand,
                    Gender = p.Gender,
                    CategoryId = p.CategoryId,
                    TypeId = p.TypeId,
                    IsNew = p.IsNew,
                    Price = p.Variants
                        .SelectMany(v => v.Sizes)
                        .OrderBy(s => s.Price)
                        .Select(s => s.Price)
                        .FirstOrDefault(),
                    Variants = p.Variants.Select(v => new ProductVariantDto
                    {
                        Id = v.Id,
                        Colour = v.Colour,
                        ImageUrl = v.ImageUrl,
                        Sizes = v.Sizes
                            .OrderBy(s => s.Size)
                            .Select(s => new ProductSizeDto
                            {
                                Id = s.Id,
                                Size = s.Size,
                                Price = s.Price,
                                Stock = s.Stock
                            })
                            .ToList()
                    }).ToList()
                })
                .ToListAsync();

            return Ok(products);
        }
    }
}