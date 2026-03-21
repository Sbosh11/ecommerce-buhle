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
        public async Task<ActionResult> GetProducts(
            [FromQuery] int? categoryId,
            [FromQuery] string? colour,
            [FromQuery] string? size,
            [FromQuery] string? search,
            [FromQuery] string? sort,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            // Safety limits
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 50 ? 50 : pageSize;

            var query = _context.Products
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .AsQueryable();

            // Filtering
            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            if (!string.IsNullOrEmpty(colour))
                query = query.Where(p =>
                    p.Variants.Any(v => v.Colour.ToLower() == colour.ToLower()));

            if (!string.IsNullOrEmpty(size))
                query = query.Where(p =>
                    p.Variants.Any(v => v.Size.ToLower() == size.ToLower()));

            // Search
            if (!string.IsNullOrEmpty(search))
                query = query.Where(p =>
                    p.Name.ToLower().Contains(search.ToLower()) ||
                    p.Brand.ToLower().Contains(search.ToLower()));

            // Sorting
            query = sort switch
            {
                "price_asc" => query.OrderBy(p =>
                    p.Variants.Any() ? p.Variants.Min(v => v.Price) : p.Price),

                "price_desc" => query.OrderByDescending(p =>
                    p.Variants.Any() ? p.Variants.Min(v => v.Price) : p.Price),

                "name" => query.OrderBy(p => p.Name),

                _ => query.OrderBy(p => p.Id)
            };

            var totalCount = await query.CountAsync();

            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Slug = p.Slug,
                Description = p.Description,
                Price = p.Variants.Any()
                    ? p.Variants.Min(v => v.Price)
                    : p.Price,
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

            return Ok(new
            {
                totalCount,
                page,
                pageSize,
                data = result
            });
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            var result = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Description = product.Description,
                Price = product.Variants.Any()
                    ? product.Variants.Min(v => v.Price)
                    : product.Price,
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
                Price = p.Variants.Any()
                    ? p.Variants.Min(v => v.Price)
                    : p.Price,
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