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

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _context.Categories
                .Include(c => c.Products)
                    .ThenInclude(p => p.Images)
                .Include(c => c.Products)
                    .ThenInclude(p => p.Variants)
                .ToListAsync();

            var result = categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug,
                Products = c.Products.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Description = p.Description,
                    Price = p.Price,
                    Brand = p.Brand,
                    CategoryId = p.CategoryId,

                    Images = p.Images.Select(i => new ProductImageDto
                    {
                        Id = i.Id,
                        Url = i.Url
                    }).ToList(),

                    Variants = p.Variants.Select(v => new ProductVariantDto
                    {
                        Id = v.Id,
                        Size = v.Size,
                        Colour = v.Colour,
                        Price = v.Price,
                        Stock = v.Stock
                    }).ToList()
                }).ToList()
            }).ToList();

            return Ok(result);
        }

        // GET: api/categories/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var c = await _context.Categories
                .Include(c => c.Products)
                    .ThenInclude(p => p.Images)
                .Include(c => c.Products)
                    .ThenInclude(p => p.Variants)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (c == null)
                return NotFound();

            var result = new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug,
                Products = c.Products.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Description = p.Description,
                    Price = p.Price,
                    Brand = p.Brand,
                    CategoryId = p.CategoryId,

                    Images = p.Images.Select(i => new ProductImageDto
                    {
                        Id = i.Id,
                        Url = i.Url
                    }).ToList(),

                    Variants = p.Variants.Select(v => new ProductVariantDto
                    {
                        Id = v.Id,
                        Size = v.Size,
                        Colour = v.Colour,
                        Price = v.Price,
                        Stock = v.Stock
                    }).ToList()
                }).ToList()
            };

            return Ok(result);
        }
    }
}