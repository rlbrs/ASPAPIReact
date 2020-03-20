using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace RahulTask1.Model
{
    public class Store
    {
        [Key]
        public int StoreId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Address { get; set; }


        public IList<Sale> Sales { get; set; }
    }
}
