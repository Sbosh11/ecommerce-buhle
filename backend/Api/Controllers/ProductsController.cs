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
                .AsQueryable();

            // Filters
            if (!string.IsNullOrEmpty(gender))
                query = query.Where(p => p.Gender == gender);

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId);

            if (typeId.HasValue)
                query = query.Where(p => p.TypeId == typeId);

            var products = await query
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Brand = p.Brand,
                    Gender = p.Gender,
                    CategoryId = p.CategoryId,
                    TypeId = p.TypeId,
                    IsNew = p.IsNew,

                    MinPrice = p.Variants.Min(v => v.Price),
                    MaxPrice = p.Variants.Max(v => v.Price),

                    Variants = p.Variants.Select(v => new ProductVariantDto
                    {
                        Id = v.Id,
                        Size = v.Size,
                        Colour = v.Colour,
                        Price = v.Price,
                        Stock = v.Stock,
                        ImageUrl = v.ImageUrl
                    }).ToList()
                })
                .ToListAsync();

            return Ok(products);
        }
    }
}