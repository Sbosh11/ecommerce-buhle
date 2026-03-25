using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public string Brand { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    }
}