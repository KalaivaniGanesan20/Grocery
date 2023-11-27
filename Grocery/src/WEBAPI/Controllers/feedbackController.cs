using Microsoft.AspNetCore.Mvc;
namespace Feedback
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController:Controller
    {
        private readonly feedbackDbContext _dbcontext;

        public FeedbackController(feedbackDbContext DbContext)
        {
            _dbcontext=DbContext;
        }

        [HttpGet]
        [Route("OrderFeedback")]
        public ActionResult<IEnumerable<OrderFeedback>> GetOrderFeedback()
        {
           return _dbcontext.orderFeedbacks.ToList();
        }

        [HttpPost]
        [Route("OrderFeedback")]
        public ActionResult<IEnumerable<OrderFeedback>> PostOrderfeedback(OrderFeedback feedback)
        {
            _dbcontext.orderFeedbacks.Add(feedback);
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("ProductFeedback")]
        public ActionResult<IEnumerable<ProductFeedback>> GetProductFeedback()
        {
            var Feedback=_dbcontext.productFeedbacks.ToList();
           return Feedback;
        }

         [HttpGet("{id}")]
        public ActionResult<IEnumerable<ProductFeedback>> GetProductFeedbackById(string id)
        {
            var Feedback=_dbcontext.productFeedbacks.Where(product=>product.productid==id);
           return Feedback.ToList();
        }

        [HttpPost]
        [Route("Feedback")]
        public ActionResult<IEnumerable<ProductFeedback>> Postproductfeedback(ProductFeedback feedback)
        {
            _dbcontext.productFeedbacks.Add(feedback);
            _dbcontext.SaveChanges();
            return Ok();
        }
    }
}
