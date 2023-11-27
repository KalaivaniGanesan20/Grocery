import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferserviceService {

  constructor(private http:HttpClient) { }

iscontentdisplay = false;
isofferexit:any=false;

offervalue:any;
offerstatus:any;
value:number=0;
rate:number=0;
distance:any;
date:any;
offername:any;

day:any;
hours:any;
minutes:any;
seconds:any;

errormessage='';

offerurl=environment.offer;
quotesurl=environment.quotes;

//Quotes

loggedinuser:any=localStorage.getItem('user');
user=JSON.parse(this.loggedinuser);

updatequotes(quotes:any)
  {
    return this.http.post(this.quotesurl,quotes);
  }

getstatus()
{
  if(localStorage.getItem('quoteexit')==='true')
  {
    return true;
  }
  return false;
}

 getquotes()
 {
   return this.http.get<any>(this.quotesurl+'/1').pipe(catchError(this.handleError));
 }

 displayContentWithTimer(time:any)
 {
  this.iscontentdisplay = false; // Show the content
  this.value=parseInt(time)*60000;
  setTimeout(() => {
    this.iscontentdisplay = true;
    this.quotedelete();
    localStorage.removeItem('quoteexit');
  },this.value);
}

quotedelete()
{
  this.http.delete(this.quotesurl+'/1').subscribe(res=>{
    Swal.fire({
      imageHeight: 300,
      imageAlt: 'A tall image',
      html:'<h4>Todays Quotes time out</h4>'
    })
  })
}

//Offer

updateoffer(offer:any)
{
  return this.http.post(this.offerurl,offer);
}

getoffer()
{
  return this.http.get<any[]>(this.offerurl+'/1').pipe(catchError(this.handleError));
}
countertime():any
{
  this.getoffer().subscribe(result=>
    { this.offervalue=result
      this.rate=this.offervalue.rate;
      this.offername=this.offervalue.offername;
       this.date=new Date(this.offervalue.time).getTime();
        var todaydate=new Date().getTime();
        this.distance=this.date - todaydate;
        this.isofferexit=true;
      localStorage.setItem('offer','true');
      setTimeout(()=>{
        this.isofferexit=false;
        this.deleteoffer();
        localStorage.removeItem('offer');
        Swal.fire({
          icon: 'error',
          title: 'Offer Ended...'+this.offervalue.time,
          text: 'Opps  Offer Time out!',
        })
      },this.distance)
      if(this.distance<=0)
      {
        this.isofferexit=false;
        localStorage.removeItem('offer');
        return this.isofferexit;
      }

      return this.isofferexit;
    },error=>{
      this.errormessage='NO New Offers!!!!';
    });
}


deleteoffer()
{
  return this.http.delete(this.offerurl+'/1').subscribe();
}

getOfferstatus()
{
  if(localStorage.getItem('offer')==='true')
  {
    return true;
  }
  return false ;
}
startCountdown() {
  const interval = setInterval(() => {
    const totalSeconds = Math.floor(this.distance / 1000);
    this.day=Math.floor((this.distance) / (1000 * 60 * 60 *24));
     this.hours=Math.floor((this.distance) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
     this.minutes=Math.floor((this.distance) % (1000 * 60 * 60 ) / (1000 * 60));
    this.seconds=Math.floor((this.distance)%(1000 * 60 )/(1000));
    this.distance -= 1000;
    if (this.distance <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

private handleError(error: HttpErrorResponse) {
  let Errormessage='';
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      Errormessage=`Backend returned code ${error.status}, body was: `, error.error
      );
  }
  Errormessage+='Something bad happened; please try again later.'
  // Return an observable with a user-facing error message.
  return throwError(() => new Error(Errormessage));
}

}
