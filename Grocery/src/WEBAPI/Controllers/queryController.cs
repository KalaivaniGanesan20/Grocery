using Microsoft.AspNetCore.Mvc;

namespace query
{
  [ApiController]
   [Route("api/[controller]")]
  public class queryController:Controller
  {
    private readonly queryDb query_db;
    public queryController(queryDb querydb)
    {
       query_db=querydb;
    }

    [HttpGet]
    public ActionResult<IEnumerable<querydata>> Getdata()
    {
      var querydata=query_db.queries.ToList();
      return querydata;
    }
    [HttpPost]
    [Route("api/postdata")]
    public ActionResult<IEnumerable<querydata>> Postdata(querydata myquery)
    {

       query_db.queries.Add(myquery);
       query_db.SaveChanges();
       return Ok("posted  "+ myquery.queryid);
    }
  }
}
