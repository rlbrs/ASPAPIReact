using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RahulTask1.Model;

namespace RahulTask1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SalesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetSales()
        {
            var salesdata = await _context.Sales
                     .Include(s => s.Customer)
                     .Include(s => s.Product)
                     .Include(s => s.Store)
                     .Select(s => new
                     {
                         salesId = s.SalesId,
                         dateSold = s.DateSold,
                         customer = new
                         {
                             customerId = s.CustomerRefId,
                             name = s.Customer.Name,
                             address = s.Customer.Address
                         },
                         product = new
                         {
                             productId = s.ProductRefId,
                             name = s.Product.Name,
                             price = s.Product.Price
                         },
                         store = new
                         {
                             storeId = s.StoreRefId,
                             name = s.Store.Name,
                             address = s.Store.Address
                         }
                     })
                     .ToListAsync();
            return salesdata;
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> GetSale(int id)
        {
            var sales = await _context.Sales
                     .Include(s => s.Customer)
                     .Include(s => s.Product)
                     .Include(s => s.Store)
                     .Select(s => new
                     {
                         salesId = s.SalesId,
                         dateSold = s.DateSold,
                         customer = new
                         {
                             customerId = s.CustomerRefId,
                             name = s.Customer.Name
                         },
                         product = new
                         {
                             productId = s.ProductRefId,
                             name = s.Product.Name
                         },
                         store = new
                         {
                             storeId = s.StoreRefId,
                             name = s.Store.Name
                         }
                     })
                     .SingleOrDefaultAsync(i => i.salesId == id);


            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            if (id != sale.SalesId)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var sales = await _context.Sales
                     .Include(s => s.Customer)
                     .Include(s => s.Product)
                     .Include(s => s.Store)
                     .Select(s => new
                     {
                         salesId = s.SalesId,
                         dateSold = s.DateSold,
                         customer = new
                         {
                             customerId = s.CustomerRefId,
                             name = s.Customer.Name
                         },
                         product = new
                         {
                             productId = s.ProductRefId,
                             name = s.Product.Name
                         },
                         store = new
                         {
                             storeId = s.StoreRefId,
                             name = s.Store.Name
                         }
                     })
                     .SingleOrDefaultAsync(i => i.salesId == id);


            if (sales == null)
            {
                return NotFound();
            }

            return Ok(sales);
        }

        // POST: api/Sales
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(Sale sale)
        {
            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = sale.SalesId }, sale);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sale>> DeleteSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return sale;
        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.SalesId == id);
        }
    }
}
