using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyorderModule;
using MyorderDatabase;
using Microsoft.AspNetCore.JsonPatch;

namespace MyOrdersModule{
    [ApiController]
    [Route("api/[controller]")]
    public class MyordersController:Controller
    {
        private readonly MyOrdersDbContext _dbContext;
           public MyordersController(MyOrdersDbContext dbContext)
           {
              _dbContext=dbContext;
           }
            [HttpGet]
           public ActionResult<IEnumerable<MyOrders>> GetOrder()
           {
              return _dbContext.Orderdata.Include(order=>order.product).Include(order=>order.address).ToList();
           }
            [HttpGet("{id}")]
           public ActionResult<IEnumerable<MyOrders>> GetOrderByUserId(string id)
           {
              var order=_dbContext.Orderdata.Include(order=>order.product).Include(order=>order.address).Where(order=>order.userid==id).ToList();
              if(order==null)
              {
                return BadRequest();
              }
              return order;
           }

            [HttpGet()]
            [Route("api/Order")]
           public ActionResult<IEnumerable<MyOrders>> GetOrderById(Guid orderid ,string userid)
           {
              var order=_dbContext.Orderdata.Include(order=>order.product).Include(order=>order.address).Where(order=>order.id==orderid && order.userid==userid).ToList();
              if(order==null)
              {
                return BadRequest();
              }
              return order;
           }

           [HttpPost]
           public ActionResult<IEnumerable<MyOrders>> PostOrder(MyOrders order)
           {
               _dbContext.Orderdata.Add(order);
               _dbContext.SaveChanges();
               return CreatedAtAction("GetOrder", new{ id= order.id}, order);
           }

           [HttpPatch]
           public async Task<IActionResult> Updatestatus(string paymentid,[FromBody]JsonPatchDocument<MyOrders>order)
           {
              var selectedorder=_dbContext.Orderdata.FirstOrDefault(data=>data.paymentid==paymentid);
              if(selectedorder==null)
              {
               return BadRequest();
              }
              else{
                order.ApplyTo(selectedorder);
                await _dbContext.SaveChangesAsync();
                return Ok();
              }
           }

           [HttpDelete("{id}")]
           public async Task<IActionResult>DeleteOrder(string id)
           {
             var myorder=_dbContext.Orderdata.Include(data=>data.product).Include(order=>order.address).FirstOrDefault(order=>order.paymentid==id);
               _dbContext.Orderdata.Remove(myorder);
               await _dbContext.SaveChangesAsync();
              return NoContent();
           }

    }
}
