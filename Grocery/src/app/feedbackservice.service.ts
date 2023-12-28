import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackserviceService {


  constructor(private http:HttpClient) { }
  httpOption={
  headers:  new HttpHeaders({
    'Content-Type':'application/json-patch+json'
  })
}

feedbackurl=environment.feedback;

postOrderFeedback(feedback:any)
{
  return this.http.post(this.feedbackurl+'OrderFeedback',JSON.stringify(feedback),this.httpOption);
}
getOrderFeedback()
{
  return this.http.get<any[]>(this.feedbackurl+'OrderFeedback');
}
postproductrFeedback(feedback:any)
{
  return this.http.post(this.feedbackurl+'Feedback',JSON.stringify(feedback),this.httpOption);
}
getproductFeedback()
{
  return this.http.get(this.feedbackurl+'ProductFeedback');
}
getproductFeedbackById(id:any)
{
  return this.http.get(this.feedbackurl+id);
}
postquery(query:any)
{
  console.log(query);
   return this.http.post('https://localhost:7250/api/postdata',query,this.httpOption);
}
getquery()
{
   return this.http.get('https://localhost:7250/api/query');
}
updatequery(id:any,body:any)
{
  return this.http.patch('https://localhost:7250/api/update?id='+id,body);
}
}
