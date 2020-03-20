using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RahulTask1.Model
{
    public class Sale
    {
        [Key]
        public int SalesId { get; set; }

        public int ProductRefId { get; set; }
        [ForeignKey("ProductRefId")]
        public Product Product { get; set; }

        public int CustomerRefId { get; set; }
        [ForeignKey("CustomerRefId")]
        public Customer Customer { get; set; }

        public int StoreRefId { get; set; }
        [ForeignKey("StoreRefId")]
        public Store Store { get; set; }

        [DataType(DataType.Date)]
        public string DateSold { get; set; }
    }
}
