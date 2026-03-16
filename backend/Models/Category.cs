using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }  // e.g., Men, Women, Kids, Sports, Arrival

        [Required]
        public string Slug { get; set; }  // for URLs, e.g., "men", "sports"

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}