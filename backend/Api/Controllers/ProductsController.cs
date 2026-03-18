using Api.Data;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
            [FromQuery] int? categoryId,
            [FromQuery] string? colour,
            [FromQuery] string? size)
        {
            var query = _context.Products
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Include(p => p.Category)
                .AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            if (!string.IsNullOrEmpty(colour))
                query = query.Where(p => p.Variants.Any(v => v.Colour.ToLower() == colour.ToLower()));

            if (!string.IsNullOrEmpty(size))
                query = query.Where(p => p.Variants.Any(v => v.Size.ToLower() == size.ToLower()));

            var products = await query.ToListAsync();

            var result = products.Select(p => new ProductDto
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
            }).ToList();

            return Ok(result);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            var result = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Description = product.Description,
                Price = product.Price,
                Brand = product.Brand,
                CategoryId = product.CategoryId,
                Images = product.Images.Select(i => new ProductImageDto
                {
                    Id = i.Id,
                    Url = i.Url
                }).ToList(),
                Variants = product.Variants.Select(v => new ProductVariantDto
                {
                    Id = v.Id,
                    Size = v.Size,
                    Colour = v.Colour,
                    Price = v.Price,
                    Stock = v.Stock
                }).ToList()
            };

            return Ok(result);
        }

        // GET: api/products/{id}/related
        [HttpGet("{id}/related")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetRelated(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            var relatedProducts = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Where(p => p.CategoryId == product.CategoryId && p.Id != id)
                .Take(5)
                .ToListAsync();

            var result = relatedProducts.Select(p => new ProductDto
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
            }).ToList();

            return Ok(result);
        }
    }
}