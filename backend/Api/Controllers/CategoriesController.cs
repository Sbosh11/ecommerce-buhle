using Api.Data;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var result = await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Slug = c.Slug,
                    ProductCount = c.Products.Count()
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id}/products")]
        public async Task<ActionResult> GetCategoryProducts(int id)
        {
            var exists = await _context.Categories.AnyAsync(c => c.Id == id);
            if (!exists) return NotFound();

            var products = await _context.Products
                .Include(p => p.Variants)
                .Where(p => p.CategoryId == id)
                .ToListAsync();

            var result = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Slug = p.Slug,
                Description = p.Description,
                Price = p.Variants.Min(v => v.Price),
                Brand = p.Brand,
                CategoryId = p.CategoryId,

                Variants = p.Variants.Select(v => new ProductVariantDto
                {
                    Id = v.Id,
                    Size = v.Size,
                    Colour = v.Colour,
                    Price = v.Price,
                    Stock = v.Stock,
                    ImageUrl = v.ImageUrl
                }).ToList()
            }).ToList();

            return Ok(result);
        }
    }
}