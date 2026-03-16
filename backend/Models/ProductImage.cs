using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class ProductImage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Url { get; set; }  // e.g., "/images/shoe1.webp"

        // Foreign Key
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}